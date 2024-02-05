# Create VK Mini App

Библиотека create-vk-mini-app — инструмент для быстрого создания и развертывания [мини-приложений](https://dev.vk.com/mini-apps/overview) Вконтакте

## Ключевые особенности

- Cборка на [Vite](https://vitejs.dev/guide/).

- Интеграция с [VKUI](https://github.com/VKCOM/VKUI) и [vk-miniapps-router](https://github.com/VKCOM/vk-mini-apps-router).

- Конфигурации шаблонов под различные задачи.

- Поддержка последних версий библиотек + typescript.

- Удобное интерактивное меню для настройки проекта.

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

### Для Node js < 18.0.0

Если вы используете Node js < 18.0.0 то вам нужен [create-vk-mini-app v1](README_v1.md).

```bash
npx @vkontakte/create-vk-mini-app@1 [app-directory-name] [options]
```

## Опции

<table>
  <tr>
    <td width="200px"><strong>--typescript</strong></td>
    <td>Выбирает пример на typescript</td>
  </tr>
  <tr>
    <td><strong>--projectName</strong></td>
    <td>Выбирает имя, которое будет указано в package.json. Если параметр не передан, по умолчанию будет взято название директории</td>
  </tr>
  <tr>
    <td><strong>--t</strong> или <strong>--template</strong></td>
    <td>Выбирает структурный шаблон</td>
  </tr>
</table>

### Пример использования дополнительных опций

```bash
yarn create  @vkontakte/vk-mini-app mini-app --typescript --template=vkapp-router-bridge-ui
```

создаст папку “mini-app” c примером “vkapp-ui” реализованном на ts

```bash
yarn create  @vkontakte/vk-mini-app . --template=vkapp-bridge-ui
```

создаст пример “vkapp-bridge-ui” на js в текущей дериктории

## Виды шаблонов

<table>
  <tr>
    <td width="220px"><strong>vkapp-router-bridge-ui</strong></td>
    <td>вариант мини-аппа со встроенным роутером, поддерживающим анимации vkui, подключенной библиотекой vk-bridge и интерфейсом vkui</td>
  </tr>
  <tr>
    <td><strong>vkapp-bridge-ui</strong></td>
    <td>вариант мини-аппа со встроенной библиотекой vk bridge и vkui интерфейсом</td>
  </tr>
  <tr>
    <td><strong>vkapp-ui</td>
    <td>вариант веб приложения основанном на интерфейсе vkui, не является мини-аппом, так как в нем нет библиотеки vk bridge, отвечающей за связь с платформой</td>
  </tr>
</table>

## Полезные ссылки

- [документация VKUI](https://vkcom.github.io/VKUI/).

- [документация vk-mini-apps-router](https://dev.vk.com/libraries/router).

- [Примеры мини приложений](https://dev.vk.com/ru/mini-apps/examples/shop).

- [VK Mini Apps](https://vk.com/vkappsdev) — сообщество разработчиков мини-приложений ВКонтакте.

## Contributing

Мы очень радуемся, когда пользователи библиотеки работают над её улучшением. Если вы захотите расширить базу примеров или улучшить cli интерфейс, то:

1. Сделайте форк репозитория и склонируйте его.

2. Установите зависимости -`yarn`.

3. Внесите изменения.

4. Соберите - `yarn run build`.

5. Установите изменный пакет себе - `yarn link`.

6. И запустите, чтобы протестировать изменения - `create-vk-mini-app`.

7. Отправьте мр нам на проверку.
