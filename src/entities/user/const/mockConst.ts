import type {UserType} from "../lib/types";

export const principalUserMock: UserType = {
    id: 1,
    ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
    email: "testEmail@test.com",
    name: "testUser",
    username: "@testUser",
    description: "Description of first test user",
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
}
