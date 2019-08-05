<div align="center">
  <a href="https://github.com/VKCOM">
    <img width="100" height="100" src="https://avatars3.githubusercontent.com/u/1478241?s=200&v=4">
  </a>
  <br>
  <br>

  [![npm][npm]][npm-url]
  [![deps][deps]][deps-url]

</div>

# VK Mini Apps: @vkontakte/create-vk-mini-app

## How to install

### Create VK Mini App with gh-pages deploy

`npx @vkontakte/create-vk-mini-app <app-directory-name>`

### Create VK Mini App with Zeit deploy

Firstly, you have to create Zeit account and connect it with your GitHub profile — https://zeit.co/

`npx @vkontakte/create-vk-mini-app <app-directory-name> --zeit`

### Create VK Mini App with Surge deploy

Firstly, you have to create Surge account and Surge-domain — https://surge.sh/

`npx @vkontakte/create-vk-mini-app <app-directory-name> --surge <surge-domain>`

## Use Connect lib based on promise
Just add `--promise` flag. More info about **vkui-connect-promise** — https://www.npmjs.com/package/@vkontakte/vkui-connect-promise

`npx @vkontakte/create-vk-mini-app <app-directory-name> --promise`

## How to start work with app

Go to created folder and run:
`yarn start` || `npm start` — this will start dev server with hot reload on `localhost:10888`.

`yarn run build` || `npm run build` — this will build production bundle, with tree-shaking, uglify and all this modern fancy stuff

[npm]: https://img.shields.io/npm/v/@vkontakte/create-vk-mini-app.svg
[npm-url]: https://npmjs.com/package/@vkontakte/create-vk-mini-app

[deps]: https://img.shields.io/david/vkcom/create-vk-mini-app.svg
[deps-url]: https://david-dm.org/vkcom/create-vk-mini-app