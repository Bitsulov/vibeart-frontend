/**
 * @file Фикстуры сущности `community` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 *
 * Все моки исключены из анализа покрытия кода, так как не содержат
 * тестируемой логики.
 */
import { createCommunity } from "../model/createCommunity";
import { principalUserMock, profileUserMock } from "entities/user";
import img from "shared/icons/img-CTA.jpg";
import type { CommunityResponse } from "../lib/types";
import type { Page } from "shared/lib/types";

export const communitiesMyMock = [
    createCommunity({
        UUID: "00000000-0000-4000-8000-000000000015",
        owner: principalUserMock,
        username: "digital-art-club",
        title: "Digital Art Club",
        description: "Community for digital artists sharing their works and techniques",
        posts: 42,
        subscribers: 1200,
        subscribes: 5,
        createdAt: "2026-01-10T10:00:00.000Z",
        imageUrl: img,
        albumsList: [],
        admins: [],
        isSubscribed: true,
        isBlocked: false,
        trustStatus: "TRUST"
    }),
    createCommunity({
        UUID: "00000000-0000-4000-8000-000000000016",
        owner: principalUserMock,
        username: "sketch-daily",
        title: "Sketch Daily",
        description: "Daily sketching challenges and inspiration for all skill levels",
        posts: 18,
        subscribers: 340,
        subscribes: 2,
        createdAt: "2026-02-15T12:00:00.000Z",
        imageUrl: img,
        albumsList: [],
        admins: [],
        isSubscribed: true,
        isBlocked: false,
        trustStatus: "TRUST"
    })
];

export const communitiesAllMock = [
    createCommunity({
        UUID: "00000000-0000-4000-8000-000000000017",
        owner: profileUserMock,
        username: "photo-masters",
        title: "Photo Masters",
        description: "Professional and amateur photographers sharing tips and portfolios",
        posts: 310,
        subscribers: 8700,
        subscribes: 12,
        createdAt: "2025-11-20T09:00:00.000Z",
        imageUrl: img,
        albumsList: [],
        admins: [],
        isSubscribed: false,
        isBlocked: false,
        trustStatus: "TRUST"
    }),
    createCommunity({
        UUID: "00000000-0000-4000-8000-000000000018",
        owner: profileUserMock,
        username: "watercolor-world",
        title: "Watercolor World",
        description:
            "Dedicated to the art of watercolor painting — tutorials, showcases and critiques",
        posts: 95,
        subscribers: 2100,
        subscribes: 7,
        createdAt: "2026-03-01T08:30:00.000Z",
        imageUrl: img,
        albumsList: [],
        admins: [],
        isSubscribed: false,
        isBlocked: false,
        trustStatus: "TRUST"
    }),
    createCommunity({
        UUID: "00000000-0000-4000-8000-00000000001a",
        owner: profileUserMock,
        username: "watercolor-world",
        title: "Watercolor World",
        description:
            "Dedicated to the art of watercolor painting — tutorials, showcases and critiques",
        posts: 95,
        subscribers: 2100,
        subscribes: 7,
        createdAt: "2026-03-01T08:30:00.000Z",
        imageUrl: img,
        albumsList: [],
        admins: [],
        isSubscribed: false,
        isBlocked: false,
        trustStatus: "TRUST"
    }),
    createCommunity({
        UUID: "00000000-0000-4000-8000-000000000019",
        owner: profileUserMock,
        username: "watercolor-world",
        title: "Watercolor World",
        description:
            "Dedicated to the art of watercolor painting — tutorials, showcases and critiques",
        posts: 91,
        subscribers: 2000,
        subscribes: 7,
        createdAt: "2026-03-01T08:30:00.000Z",
        imageUrl: img,
        albumsList: [],
        admins: [],
        isSubscribed: false,
        isBlocked: false,
        trustStatus: "TRUST"
    })
];

export const communityMock = createCommunity({
    UUID: "00000000-0000-4000-8000-00000000001d",
    owner: principalUserMock,
    username: "digital-art-club",
    title: "Digital Art Club",
    description:
        "Сообщество цифровых художников — делимся работами, разбираем техники и вдохновляем друг друга. Открыты для всех уровней.",
    posts: 42,
    subscribers: 1200,
    subscribes: 5,
    createdAt: "2026-01-10T10:00:00.000Z",
    imageUrl: img,
    albumsList: [],
    admins: [],
    isSubscribed: false,
    isBlocked: true,
    trustStatus: "UNTRUST"
});

export const communityResponseMock: CommunityResponse = {
    uuid: "00000000-0000-4000-8000-00000000001d",
    owner: {
        uuid: "00000000-0000-4000-8000-000000000015",
        name: "testOwner",
        username: "testOwner",
        description: "",
        avatarUrl: "",
        worksCount: 0,
        subscribersCount: 0,
        subscribesCount: 0,
        createdAt: "2026-01-01T00:00:00.000Z",
        trustStatus: "TRUST",
        onlineStatus: "ONLINE",
        enabled: true,
        subscribed: null
    },
    name: "Digital Art Club",
    username: "digital-art-club",
    description:
        "Сообщество цифровых художников — делимся работами, разбираем техники и вдохновляем друг друга. Открыты для всех уровней.",
    avatarUrl: img,
    worksCount: 42,
    subscribersCount: 1200,
    subscribesCount: 5,
    createdAt: "2026-01-10T10:00:00.000Z",
    trustStatus: "TRUST",
    admins: [],
    tags: [],
    subscribed: false
};

export const communitiesPageResponseMock: Page<CommunityResponse> = {
    content: [communityResponseMock],
    number: 0,
    size: 12,
    totalElements: 1,
    totalPages: 1,
    first: true,
    last: true,
    empty: false
};
