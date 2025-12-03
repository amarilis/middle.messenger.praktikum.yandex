## Описание

Это сверстанные страницы с использованием шаблонизатора **Handlebars** и сборщика **Vite**. [Макеты](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=12-80&t=kvPQyJppf5rei9lm-0) предоставлены Яндексом.

Дополнительно подключена авторизация, получение списка чатов со вставкой данных с сервера, получение данных пользователя и вставка их в профиль пользователя.

Проект переписан на typescript EvetBus и класса Block, добавлены проверки форм

Для получения данных следует залогинится с уже имеющимися данными для входа

###### Проект развернут на **Netlify** и его можно посмотреть по ссылкам:

- «[Страница логина](https://spectacular-biscotti-a8ffc1.netlify.app/login.html)»,
- «[Страница регистрации](https://spectacular-biscotti-a8ffc1.netlify.app/registration.html)»,
- «[Страница чата](https://spectacular-biscotti-a8ffc1.netlify.app/index.html)»,
- «[Страница профиля пользователя](https://spectacular-biscotti-a8ffc1.netlify.app/profile.html)»,
- «[Страница с ошибкой 404](https://spectacular-biscotti-a8ffc1.netlify.app/errors.html)»,
- «Страница с ошибкой 5\*\* такая же как и 404. Для ее отображения в шаблоне будут подставляться другие параметры»,

---

Для установки проекта необходимо выполнить команды:

- `npm run build` - собирает проект,
- `npm run start` - устанавливает зависимости и собирает проект,
- `npm run dev` - запускает проект в режиме разработки.
