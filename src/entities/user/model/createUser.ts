import type { UserType } from "./types";

export function createUser({
    id = Date.now(),
    userName,
    firstName,
    secondName,
    description = "",
    subscribers = 0,
    subscribes = 0,
    works = 0,
    srcImg,
	date,
    status = "offline"
}: UserType) {
    return {
        id,
        userName,
        firstName,
        secondName,
        description,
        subscribers,
        subscribes,
        works,
        srcImg,
		date,
        status
    };
}
