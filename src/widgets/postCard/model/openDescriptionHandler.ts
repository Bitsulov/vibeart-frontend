import type {Dispatch, SetStateAction} from "react";

/** Раскрывает описание поста. */
export const openDescriptionHandler = (setIsOpened: Dispatch<SetStateAction<boolean>>) => {
    setIsOpened(true);
};
