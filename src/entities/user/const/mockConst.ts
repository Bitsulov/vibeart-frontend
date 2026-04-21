import {createUser} from "../model/createUser";
import avatar from "shared/icons/img-CTA.jpg";

export const principalUserMock = createUser({
    id: 1,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    email: "testEmail@test.com",
    name: "testUsergffdgfd",
    username: "testUser",
    description: "Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    albumList: [],
    createdAt: new Date().toISOString(),
    trustStatus: "untrust",
    isAuthenticated: true,
    isBlocked: true,
    onlineStatus: "online",
    role: "user",
    avatarUrl: ""
});

export const profileUserMock = createUser({
    id: 2,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAA",
    email: "testEmail2@test.com",
    name: "testUser",
    username: "testUser",
    description: "Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user",
    worksCount: 0,
    subscribersCount: 999100,
    subscribesCount: 0,
    albumList: [],
    createdAt: "2026-03-22T18:50:29.921Z",
    trustStatus: "trust",
    isAuthenticated: true,
    isBlocked: false,
    onlineStatus: "online",
    role: "user",
    avatarUrl: avatar
});

export const communityAdminsMock = [
    createUser({
        id: 3,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FB0",
        email: "admin1@test.com",
        name: "Alice Wonder",
        username: "alice.wonder",
        description: "",
        worksCount: 12,
        subscribersCount: 450,
        subscribesCount: 30,
        albumList: [],
        createdAt: "2025-12-01T10:00:00.000Z",
        trustStatus: "trust",
        isAuthenticated: true,
        isBlocked: false,
        onlineStatus: "online",
        role: "user",
        avatarUrl: avatar
    }),
    createUser({
        id: 4,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FB9",
        email: "admin2@test.com",
        name: "Bob Rivers",
        username: "bob.rivers",
        description: "",
        worksCount: 7,
        subscribersCount: 210,
        subscribesCount: 15,
        albumList: [],
        createdAt: "2026-01-05T08:00:00.000Z",
        trustStatus: "trust",
        isAuthenticated: true,
        isBlocked: false,
        onlineStatus: "offline",
        role: "user",
        avatarUrl: avatar
    }),
];
