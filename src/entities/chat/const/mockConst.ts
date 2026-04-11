import {createChat} from "../model/createChat";
import {createMessage} from "entities/message";
import {principalUserMock, profileUserMock} from "entities/user";

export const chatsMock = [
    createChat({
        id: 1,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FA1",
        companion: profileUserMock,
        lastMessage: createMessage({
            id: 1,
            text: "Привет! Как дела?",
            createdAt: "2024-04-10T10:30:00.000Z",
            isYour: false,
            status: "read",
        }),
        createdAt: "2026-04-01T09:00:00.000Z",
        imageUrl: "",
    }),
    createChat({
        id: 2,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FA2",
        companion: principalUserMock,
        lastMessage: createMessage({
            id: 2,
            text: "Посмотри мою новую работу, буду рад отзыву!",
            createdAt: "2026-04-11T12:15:00.000Z",
            isYour: true,
            status: "sent",
        }),
        createdAt: "2026-04-02T11:00:00.000Z",
        imageUrl: "",
    }),
    createChat({
        id: 3,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FA3",
        companion: profileUserMock,
        lastMessage: createMessage({
            id: 3,
            text: "Спасибо за вдохновение!",
            createdAt: "2026-01-09T18:45:00.000Z",
            isYour: false,
            status: "read",
        }),
        createdAt: "2026-04-03T14:00:00.000Z",
        imageUrl: "",
    }),
    createChat({
        id: 4,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FA4",
        companion: principalUserMock,
        lastMessage: createMessage({
            id: 4,
            text: "Когда планируешь выложить следующий пост?",
            createdAt: "2026-04-08T20:00:00.000Z",
            isYour: false,
            status: "read",
        }),
        createdAt: "2026-04-04T16:30:00.000Z",
        imageUrl: "",
    }),
    createChat({
        id: 5,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FA5",
        companion: profileUserMock,
        lastMessage: createMessage({
            id: 5,
            text: "Отличная работа, продолжай в том же духе!",
            createdAt: "2026-04-07T09:20:00.000Z",
            isYour: true,
            status: "save",
        }),
        createdAt: "2026-04-05T08:00:00.000Z",
        imageUrl: "",
    }),
];
