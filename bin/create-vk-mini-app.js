#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');

const packageJson = require('../package.json');

const showHelp = ~process.argv.indexOf('--help');
const usePromise = ~process.argv.indexOf('--promise');
const useZeit = ~process.argv.indexOf('--zeit');
const surgeIndex = process.argv.indexOf('--surge');
const useSurge = ~surgeIndex;
const surgeDomain = useSurge ? process.argv[surgeIndex + 1] : '';

if (showHelp) {
	console.error(`🖖 Usage:
1️⃣ Create VK Mini App with gh-pages deploy: ${chalk.bold.green('create-vk-mini-app <app-directory-name>')}
2️⃣ Create VK Mini App with Zeit deploy: ${chalk.bold.green('create-vk-mini-app <app-directory-name> --zeit')}
3️⃣ Create VK Mini App with Surge deploy: ${chalk.bold.green('create-vk-mini-app <app-directory-name> --surge <surge-domain>')}`);
	return;
}

if (useSurge && !surgeDomain) {
	console.error(`😳 You have to specify your Surge domain`);
	return;
}

const scripts = `"start": "cross-env PORT=10888 react-scripts start",
"build": "react-scripts build"${useZeit ? `,
"now-build": "react-scripts build"` : ''}${useSurge ? `,
"surge-deploy": "npm run build && surge ./build --domain ${surgeDomain}.surge.sh"` : ''}`;

// Polyfill
if (!Object.entries) {
	Object.entries = function( obj ){
	  var ownProps = Object.keys( obj ),
		  i = ownProps.length,
		  resArray = new Array(i); // preallocate the Array
	  while (i--)
		resArray[i] = [ownProps[i], obj[ownProps[i]]];

	  return resArray;
	};
  }

// Parse and prepare string to install dependencies
const getDeps = (deps) =>
	Object.entries(deps)
		.map(dep => `${dep[0]}@${dep[1]}`)
		.toString()
		.replace(/,/g, ' ')
		.replace(/^/g, '')
		// exclude the plugin only used in this file, nor relevant to the boilerplate
		.replace(/fs-extra[^\s]+/g, '')
		.replace(/gh-pages[^\s]+/g, '');

console.log('🎬  Creating project...');

exec(
	`mkdir ${process.argv[2]} && cd ${process.argv[2]} && npm init -f`,
	(initErr) => {
		if (initErr) {
			console.error(`😳 Initializing error:\n${initErr}`);
			return;
		}
		const packageJSON = `${process.argv[2]}/package.json`;

		fs.readFile(packageJSON, (err, file) => {
			if (err) throw err;
			const data = file
				.toString()
				.replace('"test": "echo \\"Error: no test specified\\" && exit 1"', scripts)
				.replace('"license": "ISC"', '"license": "MIT"');
			fs.writeFile(packageJSON, data, (error) => {
				if (error) throw error;
			});
		});

		const filesToCopy = ['README.md'];

		for (let i = 0; i < filesToCopy.length; i += 1) {
			fs.createReadStream(path.join(__dirname, `../${filesToCopy[i]}`))
			.pipe(fs.createWriteStream(`${process.argv[2]}/${filesToCopy[i]}`));
		}


		let body = `# Logs
logs
*.log
npm-debug.log*
*.lock

# Dependency directories
package-lock.json
/node_modules

# Optional npm cache directory
.npm

# Prod Bundle
/build

.vscode
.idea
`;
		fs.writeFile(`${process.argv[2]}/.gitignore`, body, { encoding: 'utf-8' }, (err) => {
			if (err) throw err;
		});

		//Zeit
		if (useZeit) {
			const nowJson = `{
    "version": 1,
    "name": "VK Mini App",
    "builds": [
        {
            "src": "package.json",
            "use": "@now/static-build",
            "config": { "distDir": "build" }
        }
    ],
    "routes": [
        {
            "src": "/static/(.*)",
            "headers": { "cache-control": "s-maxage=31536000,immutable" },
            "dest": "/static/$1"
        },
        { "src": "/favicon.ico", "dest": "/favicon.ico" },
        { "src": "/asset-manifest.json", "dest": "/asset-manifest.json" },
        { "src": "/manifest.json", "dest": "/manifest.json" },
        { "src": "/precache-manifest.(.*)", "dest": "/precache-manifest.$1" },
        {
            "src": "/service-worker.js",
            "headers": { "cache-control": "s-maxage=0" },
            "dest": "/service-worker.js"
        },
        {
            "src": "/(.*)",
            "headers": { "cache-control": "s-maxage=0" },
            "dest": "/index.html"
        }
    ]
}`;
			fs.writeFile(`${process.argv[2]}/now.json`, nowJson, { encoding: 'utf-8' }, (err) => {
				if (err) throw err;
			});
		}

		// installing dependencies
		console.log('⏱ Installing project dependencies — it might take a few minutes..');
		if (useSurge) {
			packageJson.devDependencies['surge'] = 'latest';
		}
		if (usePromise) {
			packageJson.dependencies['@vkontakte/vkui-connect-promise'] = 'latest';
		} else {
			packageJson.dependencies['@vkontakte/vkui-connect'] = 'latest';
		}
		const devDeps = packageJson.devDependencies ? getDeps(packageJson.devDependencies) : '';
		const deps = packageJson.dependencies ? getDeps(packageJson.dependencies) : '';

		exec(
			`cd ${process.argv[2]}${devDeps ? ` && npm install ${devDeps} --save-dev` : ''}${deps ? ` && npm install ${deps}` : ''}`,
			(npmErr, npmStdout) => {
				if (npmErr) {
					console.error(`😳 npm error:\n${npmErr}`);
					return;
				}
				console.log('✅ Dependencies installed');

				console.log('⏱ Copying VK Mini App source files..');
				fs.copy(path.join(__dirname, '../public'), `${process.argv[2]}/public`)
				.then(() => console.log(`🖼  Assets directory and file copied`))
				.catch(err => console.error(err));

				fs.copy(path.join(__dirname, '../src'), `${process.argv[2]}/src`)
				.then(() => {
                    //Connect type
                    if (usePromise) {
                        const JS_TEMPLATE_FILES = [
                            path.join(__dirname, `../src/index.js`),
                            path.join(__dirname, `../src/App.js`),
                        ];
						const JS_FILES = [
							`${process.argv[2]}/src/index.js`,
							`${process.argv[2]}/src/App.js`,
						];
						JS_TEMPLATE_FILES.map((jsFile, index) => {
                            fs.readFile(jsFile, 'utf8', function (err,data) {
                                if (err) {
                                    return console.log(err);
                                }
                                const result = data.replace(/'@vkontakte\/vkui-connect'/g, '\'@vkontakte/vkui-connect-promise\'');
                                fs.writeFile(JS_FILES[index], result, 'utf8', function (err) {
                                    if (err) return console.log(err);
                                });
                            });
                        });
                    }
                    console.log(`✌️ VK Mini App Boilerplate is ready to start in ${process.argv[2]} folder. \n🧐  Check README.MD for brief instructrions.\n💻  Happy Coding!`)
				})
				.catch(err => console.error(err));
			}
		);
	}
);
