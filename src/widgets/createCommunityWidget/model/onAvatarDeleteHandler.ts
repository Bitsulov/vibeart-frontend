import type { Dispatch, SetStateAction } from "react";

/**
 * Помечает аватар сообщества как удаляемый.
 *
 * @param setIsDeleteAvatar - Сеттер признака удаления аватара.
 */
export function onAvatarDeleteHandler(
    setIsDeleteAvatar: Dispatch<SetStateAction<boolean>>
) {
    setIsDeleteAvatar(true);
}
