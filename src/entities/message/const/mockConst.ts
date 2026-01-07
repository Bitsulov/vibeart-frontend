import { createMessage } from "../model/createMessage";

export const chatMessagesMock = [
    createMessage({
        id: 0,
        type: "incoming",
        status: "read",
        text: "Привет! Как дела?",
        time: "2020-06-20T18:42:00.00Z"
    }),
    createMessage({
        id: 1,
        type: "incoming",
        status: "read",
        text: "Привет! Как дела?",
        time: "2020-06-20T18:42:00.00Z"
    }),
    createMessage({
        id: 10,
        type: "incoming",
        status: "read",
        text: "Привет! Как дела?",
        time: "2025-06-20T18:42:00.00Z"
    }),
    createMessage({
        id: 9,
        type: "incoming",
        status: "read",
        text: "Привет! Как дела?",
        time: "2025-06-21T18:42:00.00Z"
    }),
    createMessage({
        id: 2,
        type: "outgoing",
        status: "read",
        text: "Привет! Всё отлично, работаю над новой иллюстрацией 😊",
        time: "2025-06-21T08:42:00.00Z"
    }),
    createMessage({
        id: 3,
        type: "incoming",
        status: "read",
        text: "Привет! Как дела?",
        time: "2025-06-21T09:00:00.00Z"
    }),
    createMessage({
        id: 4,
        type: "incoming",
        status: "read",
        text: "Привет! Как дела?",
        time: "2025-06-21T21:42:00.00Z"
    }),
    createMessage({
        id: 5,
        type: "outgoing",
        status: "read",
        text: "Привет! Всё отлично, работаю над новой иллюстрацией 😊",
        time: "2025-06-22T21:42:00.00Z"
    }),
    createMessage({
        id: 6,
        type: "outgoing",
        status: "read",
        text: "Привет! Всё отлично, работаю над новой иллюстрацией 😊",
        time: "2025-06-23T21:42:00.00Z"
    }),
    createMessage({
        id: 7,
        type: "incoming",
        status: "read",
        text: "Привет! Как дела?",
        time: "2025-06-24T21:42:00.00Z"
    }),
    createMessage({
        id: 8,
        type: "outgoing",
        status: "unread",
        text: "Привет! Всё отлично, работаю над новой иллюстрацией 😊",
        time: "2025-06-25T21:42:00.00Z"
    })
];
