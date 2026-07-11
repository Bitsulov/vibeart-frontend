/**
 * @file Фикстуры сущности `user` для использования в модульных тестах
 * и сквозных сценариях Playwright.
 */
import { createUser } from "../model/createUser";
import type {
    AuthResponse,
    PrincipalUserState,
    UserDetailResponse,
    UserResponse
} from "../lib/types";
import avatar from "shared/icons/img-CTA.jpg";

export const principalUserMock = createUser({
    UUID: "00000000-0000-4000-8000-00000000000b",
    name: "testUsergffdgfd",
    username: "testUser",
    description:
        "Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    albumList: [],
    createdAt: new Date().toISOString(),
    trustStatus: "UNTRUST",
    isAuthenticated: true,
    isBlocked: true,
    onlineStatus: "ONLINE",
    role: "USER",
    avatarUrl: ""
});

export const profileUserMock = createUser({
    UUID: "00000000-0000-4000-8000-000000000006",
    name: "testUser",
    username: "testUser",
    description:
        "Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user",
    worksCount: 0,
    subscribersCount: 999100,
    subscribesCount: 0,
    albumList: [],
    createdAt: "2026-03-22T18:50:29.921Z",
    trustStatus: "TRUST",
    isAuthenticated: true,
    isBlocked: false,
    onlineStatus: "ONLINE",
    role: "USER",
    avatarUrl: avatar
});

export const authResponseMock: AuthResponse = {
    uuid: "00000000-0000-4000-8000-00000000000a",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    accessTokenExpiresIn: 60000,
    refreshTokenExpiresIn: 120000
};

export const userDetailResponseMock: UserDetailResponse = {
    uuid: "00000000-0000-4000-8000-00000000000a",
    name: "testUser",
    username: "testUser",
    avatarUrl: "",
    email: "testEmail@test.com",
    role: "USER",
    enabled: true
};

export const userResponseMock: UserResponse = {
    name: "testUser",
    username: "testUser",
    description: "",
    avatarUrl: "",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    createdAt: "2026-03-22T18:50:29.921Z",
    trustStatus: "TRUST",
    onlineStatus: "ONLINE",
    enabled: true
};

export const communityAdminsMock = [
    createUser({
        UUID: "00000000-0000-4000-8000-000000000014",
        name: "Alice Wonder",
        username: "alice.wonder",
        description: "",
        worksCount: 12,
        subscribersCount: 450,
        subscribesCount: 30,
        albumList: [],
        createdAt: "2025-12-01T10:00:00.000Z",
        trustStatus: "TRUST",
        isAuthenticated: true,
        isBlocked: false,
        onlineStatus: "ONLINE",
        role: "USER",
        avatarUrl: avatar
    }),
    createUser({
        UUID: "00000000-0000-4000-8000-00000000001b",
        name: "Bob Rivers",
        username: "bob.rivers",
        description: "",
        worksCount: 7,
        subscribersCount: 210,
        subscribesCount: 15,
        albumList: [],
        createdAt: "2026-01-05T08:00:00.000Z",
        trustStatus: "TRUST",
        isAuthenticated: true,
        isBlocked: false,
        onlineStatus: "OFFLINE",
        role: "USER",
        avatarUrl: avatar
    })
];

export const principalUserSessionMock: PrincipalUserState = {
    UUID: "00000000-0000-4000-8000-00000000001b",
    name: "test name",
    username: "testUsername",
    avatarUrl: "avatar",
    email: "",
    role: "USER",
    trustStatus: "TRUST",
    isAuthenticated: true,
    isBlocked: false,
    accessToken: "",
    accessTokenExpiresIn: 0,
    refreshToken: "",
    refreshTokenExpiresIn: 0
};
