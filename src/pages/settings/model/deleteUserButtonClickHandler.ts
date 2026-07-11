import type { Dispatch, SetStateAction } from "react";

export function deleteUserButtonClickHandler(
    setIsShowModel: Dispatch<SetStateAction<boolean>>
) {
    setIsShowModel(true);
}
