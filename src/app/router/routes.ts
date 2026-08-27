import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

/**
 * Маршруты приложения без языкового префикса.
 *
 * Используются для клиентской навигации через `<Link>`. При открытии
 * {@link InitProvider} автоматически добавляет языковой префикс в URL.
 * Дублируются под `/:lang` для SSR и внешних ссылок с языковым префиксом.
 *
 * Все динамические сегменты используют UUID.
 */
const appRoutes = [
    index("./routes/_index.tsx"),
    route("auth", "./routes/auth.tsx"),
    route("register", "./routes/register.tsx"),
    route("forgotPassword", "./routes/forgotPassword.tsx"),
    route("profile/:uuid", "./routes/profile.$uuid.tsx"),
    route("gallery", "./routes/gallery.tsx"),
    route("post/add", "./routes/post.add.tsx"),
    route("post/:uuid", "./routes/post.$uuid.tsx"),
    route("post/:uuid/edit", "./routes/post.$uuid.edit.tsx"),
    route("album/add", "./routes/album.add.tsx"),
    route("album/:uuid", "./routes/album.$uuid.tsx"),
    route("album/:uuid/edit", "./routes/album.$uuid.edit.tsx"),
    route("chats", "./routes/chats.tsx"),
    route("chats/:uuid", "./routes/chats.$uuid.tsx"),
    route("communities", "./routes/communities.tsx"),
    route("communities/add", "./routes/communities.add.tsx"),
    route("communities/:uuid", "./routes/communities.$uuid.tsx"),
    route("settings", "./routes/settings.tsx"),
    route("notifications", "./routes/notifications.tsx"),
    route("agreement", "./routes/agreement.tsx"),
    route("policy", "./routes/policy.tsx"),
    route("contacts", "./routes/contacts.tsx")
];

/**
 * Маршруты приложения с языковым префиксом `/:lang`.
 *
 * Дублируют {@link appRoutes}, но каждый маршрут имеет уникальный `id`,
 * так как React Router запрещает использовать один и тот же файл маршрута
 * в нескольких деревьях без явного идентификатора.
 */
const langAppRoutes = [
    index("./routes/_index.tsx", { id: "lang-index" }),
    route("auth", "./routes/auth.tsx", { id: "lang-auth" }),
    route("register", "./routes/register.tsx", { id: "lang-register" }),
    route("forgotPassword", "./routes/forgotPassword.tsx", { id: "lang-forgotPassword" }),
    route("profile/:uuid", "./routes/profile.$uuid.tsx", { id: "lang-profile" }),
    route("gallery", "./routes/gallery.tsx", { id: "lang-gallery" }),
    route("post/add", "./routes/post.add.tsx", { id: "lang-post-add" }),
    route("post/:uuid", "./routes/post.$uuid.tsx", { id: "lang-post" }),
    route("post/:uuid/edit", "./routes/post.$uuid.edit.tsx", { id: "lang-post-edit" }),
    route("album/add", "./routes/album.add.tsx", { id: "lang-album-add" }),
    route("album/:uuid", "./routes/album.$uuid.tsx", { id: "lang-album" }),
    route("album/:uuid/edit", "./routes/album.$uuid.edit.tsx", { id: "lang-album-edit" }),
    route("chats", "./routes/chats.tsx", { id: "lang-chats" }),
    route("chats/:uuid", "./routes/chats.$uuid.tsx", { id: "lang-chats-item" }),
    route("communities", "./routes/communities.tsx", { id: "lang-communities" }),
    route("communities/add", "./routes/communities.add.tsx", {
        id: "lang-communities-add"
    }),
    route("communities/:uuid", "./routes/communities.$uuid.tsx", {
        id: "lang-communities-item"
    }),
    route("settings", "./routes/settings.tsx", { id: "lang-settings" }),
    route("notifications", "./routes/notifications.tsx", { id: "lang-notifications" }),
    route("agreement", "./routes/agreement.tsx", { id: "lang-agreement" }),
    route("policy", "./routes/policy.tsx", { id: "lang-policy" }),
    route("contacts", "./routes/contacts.tsx", { id: "lang-contacts" })
];

/**
 * Итоговое дерево маршрутов приложения.
 *
 * Служебные маршруты `robots.txt` и `sitemap.xml` обрабатываются первыми.
 * Корневой маршрут `/` перенаправляет на языковую версию через {@link _redirect}.
 * Маршруты без языкового префикса нужны для клиентской навигации,
 * с префиксом `/:lang` — для серверного рендеринга и прямых ссылок.
 * Маршрут `*` перехватывает все несуществующие пути и показывает страницу ошибки.
 */
export default [
    route("robots.txt", "./routes/robots.txt.ts"),
    route("sitemap.xml", "./routes/sitemap.xml.ts"),
    index("./routes/_redirect.tsx"),
    ...appRoutes,
    ...prefix(":lang", langAppRoutes),
    route("*", "./routes/$.tsx")
] satisfies RouteConfig;
