import { createNotification } from "../model/createNotification";
import ava2 from "@/shared/icons/pivo.jpg";

export const noticesMock = [
    createNotification({
        id: 1,
        authorName: "Анна",
        authorId: 1,
        noticeType: "comment",
        postId: 1,
        postName: "Рассвет",
        date: "2025-05-20T08:00:00.00Z",
        srcImg: ava2
    }),
    createNotification({
        id: 2,
        authorName: "Максим",
        authorId: 2,
        noticeType: "like",
        postId: 2,
        postName: "Рассвет",
        date: "2025-05-20T10:40:00.00Z",
        srcImg: ava2
    }),
    createNotification({
        id: 3,
        authorName: "Авлоаыифпшоуфрщпфрщф",
        authorId: 3,
        noticeType: "subscribe",
        date: "2020-01-01T08:00:00.00Z",
        srcImg: ava2
    }),
    createNotification({
        id: 4,
        authorName: "fsafds",
        authorId: 4,
        noticeType: "like",
        postId: 3,
        postName: "Рассвет",
        date: "2025-05-20T21:29:40.00Z",
        srcImg: ava2
    }),
    createNotification({ id: 5, noticeType: "system", date: "2025-05-20T21:29:40.00Z" })
];
