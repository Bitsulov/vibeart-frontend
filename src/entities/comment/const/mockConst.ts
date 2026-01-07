import { createComment } from "../model/createComment";
import ava2 from "@/shared/icons/pivo.jpg";

export const commentsMock = [
    createComment({
        id: 1,
        srcImg: ava2,
        authorName: "Комментатор 1",
        authorId: 4,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elit estdictum eget diam in, ultricies efficitur turpis. Donec nec ante euismod, dapibus turpis at, congue risus. Suspendisse ut elit turpis. Suspendisse ut egestas urna. In hac habitasse platea dictumst. Sed eleifend pellentesque erat vitae viverra. Текст комментария 1"
    }),
    createComment({
        id: 2,
        srcImg: ava2,
        authorName: "Комментатор 2",
        authorId: 4,
        text: "Текст комментария 2"
    }),
    createComment({
        id: 3,
        srcImg: ava2,
        authorName: "Комментатор 3",
        authorId: 4,
        text: "Текст комментария 3"
    }),
    createComment({
        id: 4,
        srcImg: ava2,
        authorName: "Комментатор 4",
        authorId: 4,
        text: "Текст комментария 4"
    }),
    createComment({
        id: 5,
        srcImg: ava2,
        authorName: "Комментатор 5",
        authorId: 4,
        text: "Текст комментария 5"
    })
];
