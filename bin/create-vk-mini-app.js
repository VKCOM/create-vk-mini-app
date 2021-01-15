#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');

const packageJson = require('../package.json');

const miniAppDirectory = process.argv[2] ? process.argv[2] : 'mini-app';
const showHelp = ~process.argv.indexOf('--help');
const useZeit = ~process.argv.indexOf('--zeit');
const surgeIndex = process.argv.indexOf('--surge');
const useSurge = ~surgeIndex;
const surgeDomain = useSurge ? process.argv[surgeIndex + 1] : '';

if (showHelp) {
	console.error(`🖖 Usage:
1️⃣ Create VK Mini App with @vkontakte/vk-miniapps-deploy deploy: ${chalk.bold.green('create-vk-mini-app <app-directory-name>')}
2️⃣ Create VK Mini App with Zeit deploy: ${chalk.bold.green('create-vk-mini-app <app-directory-name> --zeit')}
3️⃣ Create VK Mini App with Surge deploy: ${chalk.bold.green('create-vk-mini-app <app-directory-name> --surge <surge-domain>')}`);
	return;
}

if (useSurge && !surgeDomain) {
	console.error(`😳 You have to specify your Surge domain`);
	return;
}

const scripts = `"start": "cross-env PORT=10888 HTTPS=true react-scripts start",
"build": "react-scripts build",
"predeploy": "npm run build",
"deploy": "vk-miniapps-deploy"${useZeit ? `,
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

console.log('🎬 Creating project...');

exec(
	`mkdir ${miniAppDirectory} && cd ${miniAppDirectory} && npm init -f`,
	(initErr) => {
		if (initErr) {
			console.error(`😳 Initializing error:\n${initErr}`);
			return;
		}
		const packageJSON = `${miniAppDirectory}/package.json`;

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
			.pipe(fs.createWriteStream(`${miniAppDirectory}/${filesToCopy[i]}`));
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
		fs.writeFile(`${miniAppDirectory}/.gitignore`, body, { encoding: 'utf-8' }, (err) => {
			if (err) throw err;
		});

		fs.writeFile(`${miniAppDirectory}/vk-hosting-config.json`, `{
  "static_path": "build",
  "app_id": 0,
  "endpoints": {
    "mobile": "index.html",
    "mvk": "index.html",
    "web": "index.html"
  }
}`, { encoding: 'utf-8' }, (err) => {
			if (err) throw err;
		});


		//Zeit
		if (useZeit) {
			const nowJson = `{
    "version": 2,
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
			fs.writeFile(`${miniAppDirectory}/now.json`, nowJson, { encoding: 'utf-8' }, (err) => {
				if (err) throw err;
			});
		}

		// installing dependencies
		console.log('⏱ Installing project dependencies — it might take a few minutes..');
		if (useSurge) {
			packageJson.devDependencies['surge'] = 'latest';
		}

		packageJson.dependencies['@vkontakte/vk-bridge'] = 'latest';
		packageJson.dependencies['@vkontakte/vkjs'] = 'latest';

		const devDeps = packageJson.devDependencies ? getDeps(packageJson.devDependencies) : '';
		const deps = packageJson.dependencies ? getDeps(packageJson.dependencies) : '';

		exec(
			`cd ${miniAppDirectory}${devDeps ? ` && npm install ${devDeps} --save-dev` : ''}${deps ? ` && npm install ${deps}` : ''}`,
			(npmErr) => {
				if (npmErr) {
					console.error(`😳 npm error:\n${npmErr}`);
					return;
				}
				console.log('✅ Dependencies installed');

				console.log('⏱ Copying VK Mini App source files..');
				fs.copy(path.join(__dirname, '../public'), `${miniAppDirectory}/public`)
				.then(() => console.log(`🖼 Assets directory and file copied`))
				.catch(err => console.error(err));

				fs.copy(path.join(__dirname, '../src'), `${miniAppDirectory}/src`)
				.then(() => {
                    console.log(`✌️ VK Mini App Boilerplate is ready to start in ${miniAppDirectory} folder. \n🧐 Check README.MD for brief instructrions.\n💻 Happy Coding!`)
				})
				.catch(err => console.error(err));
			}
		);
	}
);
