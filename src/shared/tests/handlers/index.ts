/**
 * @file Обработчики сетевых запросов MSW для тестового окружения.
 *
 * Каждый обработчик перехватывает конкретный HTTP-запрос и возвращает
 * фиктивный ответ, не обращаясь к реальному серверу. Список пополняется
 * по мере появления новых API-вызовов в тестах.
 */
import { http, HttpResponse } from "msw";
import {
    authResponseMock,
    userDetailResponseMock,
    userResponseMock,
    friendsPageResponseMock
} from "entities/user";
import { postResponseMock, postsPageResponseMock } from "entities/post";
import { albumResponseMock } from "entities/album";
import { communityResponseMock, communitiesPageResponseMock } from "entities/community";

export const handlers = [
    http.post("*/auth/register", () => HttpResponse.text("ok")),
    http.post("*/auth/send", () => HttpResponse.text("ok")),
    http.post("*/auth/verify", () => HttpResponse.json(authResponseMock)),
    http.post("*/auth/login", () => HttpResponse.json(authResponseMock)),
    http.post("*/auth/refresh", () => HttpResponse.json(authResponseMock)),
    http.get("*/auth/user", () => HttpResponse.json(userDetailResponseMock)),
    http.get("*/user/friends/search", () => HttpResponse.json(friendsPageResponseMock)),
    http.get("*/user/friends", () => HttpResponse.json(friendsPageResponseMock)),
    http.get("*/user/:UUID", () => HttpResponse.json(userResponseMock)),
    http.put("*/user/:UUID", () => HttpResponse.json(userResponseMock)),
    http.delete("*/user/:UUID", () => HttpResponse.text("ok")),
    http.post("*/user/:UUID/email", () => HttpResponse.text("ok")),
    http.post("*/user/email/send", () => HttpResponse.text("ok")),
    http.post("*/user/email/confirm", () => HttpResponse.text("ok")),
    http.post("*/user/:UUID/password", () => HttpResponse.text("ok")),
    http.post("*/user/password/send", () => HttpResponse.text("ok")),
    http.post("*/user/password/confirm", () => HttpResponse.text("ok")),
    http.post("*/user/:UUID/subscribe", () => HttpResponse.text("ok")),
    http.get("*/post", () => HttpResponse.json(postsPageResponseMock)),
    http.get("*/post/author", () => HttpResponse.json(postsPageResponseMock)),
    http.get("*/post/search", () => HttpResponse.json(postsPageResponseMock)),
    http.get("*/post/:UUID", () => HttpResponse.json(postResponseMock)),
    http.delete("*/post/:UUID", () => HttpResponse.text("ok")),
    http.post("*/post/:UUID/like", () => HttpResponse.text("ok")),
    http.post("*/post/:UUID/report", () => HttpResponse.text("ok")),
    http.get("*/album/:UUID", () => HttpResponse.json(albumResponseMock)),
    http.get("*/community/owned", () => HttpResponse.json(communitiesPageResponseMock)),
    http.get("*/community/user/search", () =>
        HttpResponse.json(communitiesPageResponseMock)
    ),
    http.get("*/community/user", () => HttpResponse.json(communitiesPageResponseMock)),
    http.get("*/community/search", () => HttpResponse.json(communitiesPageResponseMock)),
    http.get("*/community", () => HttpResponse.json(communitiesPageResponseMock)),
    http.post("*/community/:UUID/subscribe", () => HttpResponse.text("ok")),
    http.get("*/community/:UUID", () => HttpResponse.json(communityResponseMock))
];
