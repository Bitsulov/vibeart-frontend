import type {Dispatch, SetStateAction} from "react";

/** Раскрывает описание альбома. */
export const openDescriptionHandler = (setIsOpened: Dispatch<SetStateAction<boolean>>) => {
    setIsOpened(true);
};
