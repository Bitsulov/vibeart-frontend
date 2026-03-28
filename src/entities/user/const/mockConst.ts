import {createUser} from "../model/createUser";
import avatar from "shared/icons/img-CTA.jpg";

export const principalUserMock = createUser({
    id: 1,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    email: "testEmail@test.com",
    name: "testUser",
    username: "testUser",
    description: "Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user Description of first test user",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    albumList: [],
    createdAt: new Date().toISOString(),
    trustStatus: "trust",
    isAuthenticated: true,
    isBlocked: false,
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
