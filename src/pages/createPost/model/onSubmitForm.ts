import type {Dispatch, SetStateAction} from "react";

export function onSubmitForm(file: File | undefined, setIsErrorImg: Dispatch<SetStateAction<boolean>>) {
    if(!file) {
        setIsErrorImg(true);
    } else {
        setIsErrorImg(false);
    }
}
