/**
 * @file Фикстуры сущности `album` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 *
 * Все моки исключены из анализа покрытия кода, так как не содержат
 * тестируемой логики.
 */
import { createAlbum } from "../model/createAlbum";
import { profileAlbum1PostsMock, profileAlbum2PostsMock } from "entities/post";
import img from "shared/icons/img-CTA.jpg";
import type { AlbumResponse } from "../lib/types";

export const profileAlbumsMock = [
    createAlbum({
        UUID: "00000000-0000-4000-8000-00000000000b",
        name: "test album",
        description:
            "Description of album 1 Description of album 1 Description of album 1 Description of album 1 Description of album 1",
        postCount: 4,
        postsList: profileAlbum1PostsMock,
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createAlbum({
        UUID: "00000000-0000-4000-8000-000000000009",
        name: "test album 2",
        description:
            "Description of album 2 Description of album 2 Description of album 2 Description of album 2 Description of album 2",
        postCount: 1,
        postsList: profileAlbum2PostsMock,
        imageUrl: img,
        createdAt: "2026-03-23T18:48:16.175Z"
    }),
    createAlbum({
        UUID: "00000000-0000-4000-8000-000000000006",
        name: "test album 3",
        description:
            "Description of album 3 Description of album 2 Description of album 2 Description of album 2 Description of album 2",
        postCount: 0,
        postsList: [],
        imageUrl: img,
        createdAt: "2026-03-23T18:48:16.175Z"
    }),
    createAlbum({
        UUID: "00000000-0000-4000-8000-000000000008",
        name: "test album 4",
        description:
            "Description of album 4 Description of album 2 Description of album 2 Description of album 2 Description of album 2",
        postCount: 0,
        postsList: [],
        imageUrl: img,
        createdAt: "2026-03-23T18:48:16.175Z"
    })
];

export const albumMock = createAlbum({
    UUID: "00000000-0000-4000-8000-00000000000b",
    name: "Album title",
    description:
        "Description Description Description Description Description Description Description Description Description",
    postCount: 4,
    postsList: profileAlbum1PostsMock,
    imageUrl: img,
    createdAt: "2026-03-24T18:48:16.175Z"
});

export const albumResponseMock: AlbumResponse = {
    uuid: "00000000-0000-4000-8000-00000000000b",
    title: "Album title",
    description:
        "Description Description Description Description Description Description Description Description Description",
    worksCount: 4,
    authorUser: {
        uuid: "00000000-0000-4000-8000-000000000006",
        name: "testAuthor",
        username: "testAuthor",
        description: "",
        avatarUrl: "",
        worksCount: 0,
        subscribersCount: 0,
        subscribesCount: 0,
        createdAt: "2026-01-01T00:00:00.000Z",
        trustStatus: "UNTRUST",
        onlineStatus: "ONLINE",
        enabled: true,
        subscribed: false
    },
    authorCommunity: null,
    imageUrl: img,
    createdAt: "2026-03-24T18:48:16.175Z"
};
