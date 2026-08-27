import type { Dispatch, MouseEvent, SetStateAction } from "react";
import type { UserType } from "entities/user";

/**
 * Переключает выбор пользователя в списке администраторов.
 *
 * Если пользователь уже выбран — удаляет его из списка по UUID.
 * Если не выбран — добавляет в конец списка.
 * Блокирует навигацию по ссылке через `e.preventDefault()`.
 *
 * @param e - Событие клика мыши.
 * @param selectedAdmins - Текущий список выбранных администраторов.
 * @param setSelectedAdmins - Сеттер списка выбранных администраторов.
 * @param selectedUser - Пользователь, по карточке которого кликнули.
 */
export function userClickHandler(
    e: MouseEvent,
    selectedAdmins: UserType[],
    setSelectedAdmins: Dispatch<SetStateAction<UserType[]>>,
    selectedUser: UserType
) {
    e.preventDefault();
    if (selectedAdmins.some(admin => admin.UUID === selectedUser.UUID)) {
        setSelectedAdmins(admins =>
            admins.filter(admin => admin.UUID !== selectedUser.UUID)
        );
    } else {
        setSelectedAdmins(admins => [...admins, selectedUser]);
    }
}
