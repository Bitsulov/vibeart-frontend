import type {Dispatch, SetStateAction} from "react";

export const openDescriptionHandler = (setIsOpened: Dispatch<SetStateAction<boolean>>) => {
    setIsOpened(true);
};
