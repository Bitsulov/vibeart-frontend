import { createUser } from "../model/createUser";
import ava1 from "@/shared/icons/pivo.jpg";
import ava2 from "@/shared/icons/pivo.jpg";

export const userMock = createUser({
    id: 1,
    userName: "anna_artist",
    firstName: "Анна",
    secondName: "Иванова",
    description:
        "Цифровой художник из Москвы. Люблю фэнтези и яркие цвета. Комиссии открыты! fdsakgf jsaDGKF JUgdskfu gdskaufg aDSKUFHdak sufdkshf dksf kdsg fdksugf aksu",
    subscribers: 12000,
    subscribes: 45,
    works: 78,
    srcImg: ava1,
    status: "online",
	date: "2021-09-15T14:57:06.504Z"
});

export const userChatMock = createUser({
    id: 2,
    firstName: "Пользователь",
    secondName: "1241231",
    userName: "user1241231",
    srcImg: ava1,
    status: Math.random() > 0.5 ? "online" : "offline",
	date: "2021-09-15T14:57:06.504Z"
});

export const userProfileMock = createUser({
    id: 3,
    firstName: "Тестовый",
    secondName: "Пользователь",
    userName: "test_user",
    srcImg: ava2,
    description:
        "тест Lorem ipsum dolor sit amet, consectetuer adipiscin Lorem ipsum dolor sit amet, consectetuer adipiscin",
    subscribers: 1000000,
    subscribes: 1000,
    works: 10000,
    status: "offline",
	date: "2021-09-15T14:57:06.504Z"
});

export const userCommunityMock = [
	createUser({
		id: 1,
		firstName: "Тестовый",
		secondName: "Пользователь1",
		userName: "test_user",
		srcImg: ava2,
		description:
			"тест Lorem ipsum dolor sit amet, consectetuer adipiscin Lorem ipsum dolor sit amet, consectetuer adipiscin",
		subscribers: 1000000,
		subscribes: 1000,
		works: 10000,
		status: "offline",
		date: "2021-09-15T14:57:06.504Z"
	}),
	createUser({
		id: 2,
		firstName: "Тестовый",
		secondName: "Пользователь2",
		userName: "test_user",
		srcImg: ava2,
		description:
			"тест Lorem ipsum dolor sit amet, consectetuer adipiscin Lorem ipsum dolor sit amet, consectetuer adipiscin",
		subscribers: 1000000,
		subscribes: 1000,
		works: 10000,
		status: "offline",
		date: "2021-09-15T14:57:06.504Z"
	}),
	createUser({
		id: 3,
		firstName: "Тестовый",
		secondName: "Пользователь3",
		userName: "test_user",
		srcImg: ava2,
		description:
			"тест Lorem ipsum dolor sit amet, consectetuer adipiscin Lorem ipsum dolor sit amet, consectetuer adipiscin",
		subscribers: 1000000,
		subscribes: 1000,
		works: 10000,
		status: "offline",
		date: "2021-09-15T14:57:06.504Z"
	}),
	createUser({
		id: 4,
		firstName: "Тестовый",
		secondName: "Пользователь3",
		userName: "test_user",
		srcImg: ava2,
		description:
			"тест Lorem ipsum dolor sit amet, consectetuer adipiscin Lorem ipsum dolor sit amet, consectetuer adipiscin",
		subscribers: 1000000,
		subscribes: 1000,
		works: 10000,
		status: "offline",
		date: "2021-09-15T14:57:06.504Z"
	}),
]
