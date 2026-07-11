import type { Dispatch, SetStateAction } from "react";

export function onDeleteAvatarHandler(
    setIsDeleteAvatar: Dispatch<SetStateAction<boolean>>
) {
    setIsDeleteAvatar(true);
}
