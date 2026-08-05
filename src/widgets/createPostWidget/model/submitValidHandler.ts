import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import type { CreatePostRequest, PostResponse, UpdatePostRequest } from "entities/post";
import type { AxiosResponse } from "axios";
import type { ICreatePostForm } from "../lib/types";

type submitCreateFn = (data: CreatePostRequest) => Promise<AxiosResponse<PostResponse>>;
type submitUpdateFn = ({
    UUID,
    data
}: {
    UUID: string;
    data: UpdatePostRequest;
}) => Promise<AxiosResponse<PostResponse>>;

/**
 * Обрабатывает валидную отправку формы создания или редактирования публикации.
 *
 * В режиме создания (`isCreateNewPost`) отправляет `createPostFn`; без загруженного
 * изображения показывает уведомление об ошибке вместо отправки. В режиме редактирования
 * отправляет `updatePostFn`, но только если данные формы отличаются от исходных
 * (`originalTitle`/`originalDescription`/`originalTags`) — иначе просто показывает
 * уведомление об успехе, не выполняя запрос.
 *
 * @param data - Данные формы: заголовок и описание публикации.
 * @param createPostFn - Функция запроса на создание публикации.
 * @param updatePostFn - Функция запроса на обновление публикации.
 * @param isCreateNewPost - Признак режима создания публикации (иначе — редактирования).
 * @param tags - Выбранные пользователем теги.
 * @param authorUUID - UUID текущего пользователя как автора публикации.
 * @param postUUID - UUID редактируемой публикации.
 * @param dispatch - Функция записи данных в Redux.
 * @param loadedFile - Загруженный файл изображения.
 * @param imageUrl - URL уже сохранённого изображения редактируемой публикации.
 * @param originalTitle - Исходный заголовок публикации до редактирования.
 * @param originalDescription - Исходное описание публикации до редактирования.
 * @param originalTags - Исходные теги публикации до редактирования.
 * @param isCommunity - Признак того, что публикация создаётся от имени сообщества.
 * @param communityUUID - UUID сообщества-автора публикации.
 * @param onSubmit - Callback, вызываемый после попытки отправки.
 */
export async function submitValidHandler(
    data: ICreatePostForm,
    createPostFn: submitCreateFn,
    updatePostFn: submitUpdateFn,
    isCreateNewPost: boolean,
    tags: string[],
    authorUUID: string,
    postUUID: string,
    dispatch: Dispatch,
    loadedFile: File | undefined,
    imageUrl: string | undefined,
    originalTitle: string,
    originalDescription: string,
    originalTags: string[],
    isCommunity: boolean,
    communityUUID: string,
    onSubmit: () => void
) {
    if (isCreateNewPost) {
        if (loadedFile) {
            if (isCommunity) {
                await createPostFn({
                    info: {
                        title: data.title,
                        description: data.description,
                        authorUuid: communityUUID,
                        tagsTitles: tags
                    },
                    file: loadedFile
                });
            } else {
                await createPostFn({
                    info: {
                        title: data.title,
                        description: data.description,
                        authorUuid: authorUUID,
                        tagsTitles: tags
                    },
                    file: loadedFile
                });
            }
        } else {
            dispatch(showToast({ message: "toast.loadImg", type: "error" }));
        }
    } else {
        if (!loadedFile && !imageUrl) {
            dispatch(showToast({ message: "toast.loadImg", type: "error" }));
        } else {
            const sortedTags = [...tags].sort();
            const sortedOriginalTags = [...originalTags].sort();
            const isUnchanged =
                !loadedFile &&
                data.title === originalTitle &&
                data.description === originalDescription &&
                sortedTags.length === sortedOriginalTags.length &&
                sortedTags.every((tag, i) => tag === sortedOriginalTags[i]);

            if (!isUnchanged) {
                await updatePostFn({
                    UUID: postUUID,
                    data: {
                        info: {
                            title: data.title,
                            description: data.description,
                            tagsTitles: tags
                        },
                        file: loadedFile
                    }
                });
            } else {
                dispatch(
                    showToast({
                        message: "api.postUpdatedSuccess",
                        type: "success"
                    })
                );
            }
        }
    }
    onSubmit();
}
