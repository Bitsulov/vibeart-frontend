import React from "react";

/** Добавляет или убирает пост из списка выбранных по его идентификатору. */
export function postChooseHandler(isChosen: boolean, ULID: string, setSelectedPosts: React.Dispatch<React.SetStateAction<string[]>>) {
    if(isChosen) {
        setSelectedPosts(posts => posts.filter((post) => post !== ULID));
    } else {
        setSelectedPosts(posts => [...posts, ULID]);
    }
}
