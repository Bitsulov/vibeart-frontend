import type {Dispatch, SetStateAction} from "react";

/**
 * Добавляет тег в список выбранных или убирает, если уже выбран.
 *
 * @param name - Название тега.
 * @param chosenTags - Текущий список выбранных тегов.
 * @param setChosenTags - Сеттер списка выбранных тегов.
 */
export function chooseTagClickHandler(name: string, chosenTags: string[], setChosenTags: Dispatch<SetStateAction<string[]>>) {
    if(chosenTags.includes(name)) {
        setChosenTags(tags => tags.filter(tag => tag !== name));
    } else {
        setChosenTags(tags => [...tags, name]);
    }
}
