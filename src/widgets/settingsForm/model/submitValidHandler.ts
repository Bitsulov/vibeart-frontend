import type { ISettingsForm } from "../lib/types";
import type { UpdateUserRequest, UserResponse } from "entities/user";
import type { AxiosResponse } from "axios";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";

type SubmitFn = ({
    UUID,
    data
}: {
    UUID: string;
    data: UpdateUserRequest;
}) => Promise<AxiosResponse<UserResponse>>;

/**
 * Обработчик отправки формы, формирует объект для запроса и отправляет запрос на изменение пользователя.
 *
 * @param data - Поля формы настроек пользователя.
 * @param UUID - UUID текущего пользователя.
 * @param isDeleteAvatar - Признак удаления изображения аватара.
 * @param submit - Функция отправки запроса на изменение пользователя.
 * @param dispatch - Функция записи данных в Redux.
 * @param file - Файл изображения аватара.
 */
export async function submitValidHandler(
    data: ISettingsForm,
    isDeleteAvatar: boolean,
    submit: SubmitFn,
    dispatch: Dispatch,
    UUID?: string,
    file?: File
) {
    if (file && file.size > 0) {
        isDeleteAvatar = false;
    }

    const requestData = {
        info: {
            name: data.title,
            username: data.id,
            description: data.description,
            deleteAvatar: isDeleteAvatar
        },
        file: file
    };

    if (UUID) {
        await submit({ UUID, data: requestData });
    } else {
        dispatch(showToast({ message: "toast.userNotFoundLater", type: "error" }));
    }
}
