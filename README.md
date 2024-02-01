# Create VK Mini App

Библиотека create-vk-mini-app — инструмент для быстрого создания и развертывания [мини-приложений](https://dev.vk.com/mini-apps/overview) Вконтакте

## Ключевые особенности

- Cборка на [Vite](https://vitejs.dev/guide/).

- Интеграция с [VKUI](https://github.com/VKCOM/VKUI) и [vk-miniapps-router](https://github.com/VKCOM/vk-mini-apps-router).

- Конфигурации шаблонов под различные задачи.

- Поддержка последних версий библиотек + typescript.

- Бесплатный хостинг вашего приложения при помощи [vk-mini-apps-deploy](https://dev.vk.com/ru/mini-apps/development/hosting).

## Установка и использование

### yarn

```bash
yarn create @vkontakte/vk-mini-app [app-directory-name] [options]
```

### npm

```bash
npm init @vkontakte/vk-mini-app@lastest [app-directory-name] [options]
```

### npx

```bash
npx @vkontakte/create-vk-mini-app [app-directory-name] [options]
```

### C глобальной установкой пакета

Используя yarn

```bash
yarn global add @vkontakte/create-vk-mini-app
```

или npm

```bash
npm install --global @vkontakte/create-vk-mini-app
```

После установки

```bash
create-vk-mini-app [app-directory-name] [options]
```

## Полезные ссылки

- [документация библиотеки]().

- [Примеры мини приложений](https://dev.vk.com/ru/mini-apps/examples/shop).

- [VK Mini Apps](https://vk.com/vkappsdev) — сообщество разработчиков мини-приложений ВКонтакте.

## Contributing

Мы очень радуемся, когда пользователи библиотеки работают над её улучшением. Если вы захотите расширить базу примеров или улучшить cli интерфейс, то:

1. Сделайте форк репозитория и склонируйте его.

2. Установите зависимости -`yarn`.

3. Внесите изменения

4. Соберите - `yarn run build`.

5. Установите изменный пакет себе - `yarn link`.

6. И запустите, чтобы протестировать изменения - `create-vk-mini-app`.

7. Отправьте мр нам на проверку.
