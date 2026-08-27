import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import type {
    CommunityCreateRequest,
    CommunityResponse,
    CommunityUpdateRequest
} from "entities/community";
import type { AxiosResponse } from "axios";
import type { ICreateCommunityForm } from "../lib/types";

type submitCreateFn = (
    data: CommunityCreateRequest
) => Promise<AxiosResponse<CommunityResponse>>;
type submitUpdateFn = ({
    UUID,
    data
}: {
    UUID: string;
    data: CommunityUpdateRequest;
}) => Promise<AxiosResponse<CommunityResponse>>;

/** Исходные (до редактирования) данные сообщества — используются для проверки, изменились ли данные формы. */
interface OriginalCommunityData {
    title: string;
    description: string;
    username: string;
    tags: string[];
    adminsUuids: string[];
}

/**
 * Обрабатывает валидную отправку формы создания или редактирования сообщества.
 *
 * В режиме создания (`isCreateNewCommunity`) отправляет `createCommunityFn`.
 * В режиме редактирования отправляет `updateCommunityFn`, но только если данные формы
 * отличаются от исходных (`original`) или удалён/заменён аватар — иначе просто
 * показывает уведомление об успехе, не выполняя запрос.
 *
 * @param data - Данные формы: название, описание и id (username) сообщества.
 * @param createCommunityFn - Функция запроса на создание сообщества.
 * @param updateCommunityFn - Функция запроса на обновление сообщества.
 * @param isCreateNewCommunity - Признак режима создания сообщества (иначе — редактирования).
 * @param tags - Выбранные пользователем теги.
 * @param adminsUuids - UUID выбранных пользователем администраторов.
 * @param authorUUID - UUID текущего пользователя как владельца сообщества.
 * @param communityUUID - UUID редактируемого сообщества.
 * @param isDeleteAvatar - Признак удаления аватара сообщества.
 * @param dispatch - Функция записи данных в Redux.
 * @param loadedFile - Загруженный файл аватара.
 * @param original - Исходные данные сообщества до редактирования: {@link OriginalCommunityData}.
 * @param onSubmit - Callback, вызываемый после попытки отправки.
 */
export async function submitValidHandler(
    data: ICreateCommunityForm,
    createCommunityFn: submitCreateFn,
    updateCommunityFn: submitUpdateFn,
    isCreateNewCommunity: boolean,
    tags: string[],
    adminsUuids: string[],
    authorUUID: string,
    communityUUID: string,
    isDeleteAvatar: boolean,
    dispatch: Dispatch,
    loadedFile: File | undefined,
    original: OriginalCommunityData,
    onSubmit: () => void
) {
    if (isCreateNewCommunity) {
        await createCommunityFn({
            info: {
                title: data.title,
                description: data.description,
                username: data.id || undefined,
                tagsTitles: tags,
                adminsUuids,
                userId: authorUUID
            },
            file: loadedFile
        });
    } else {
        const sortedTags = [...tags].sort();
        const sortedOriginalTags = [...original.tags].sort();
        const sortedAdmins = [...adminsUuids].sort();
        const sortedOriginalAdmins = [...original.adminsUuids].sort();

        const isUnchanged =
            !loadedFile &&
            !isDeleteAvatar &&
            data.title === original.title &&
            data.description === original.description &&
            data.id === original.username &&
            sortedTags.length === sortedOriginalTags.length &&
            sortedTags.every((tag, i) => tag === sortedOriginalTags[i]) &&
            sortedAdmins.length === sortedOriginalAdmins.length &&
            sortedAdmins.every((uuid, i) => uuid === sortedOriginalAdmins[i]);

        if (!isUnchanged) {
            await updateCommunityFn({
                UUID: communityUUID,
                data: {
                    info: {
                        title: data.title,
                        description: data.description,
                        username: data.id || undefined,
                        tagsTitles: tags,
                        adminsUuids,
                        isDeleteAvatar
                    },
                    file: loadedFile
                }
            });
        } else {
            dispatch(
                showToast({
                    message: "api.communityUpdatedSuccess",
                    type: "success"
                })
            );
        }
    }
    onSubmit();
}
