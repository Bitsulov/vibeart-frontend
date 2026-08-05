import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import type {
    AlbumCreateRequest,
    AlbumResponse,
    AlbumUpdateRequest
} from "entities/album";
import type { AxiosResponse } from "axios";
import type { ICreateAlbumForm } from "../lib/types";

type submitCreateFn = (data: AlbumCreateRequest) => Promise<AxiosResponse<AlbumResponse>>;
type submitUpdateFn = ({
    UUID,
    data
}: {
    UUID: string;
    data: AlbumUpdateRequest;
}) => Promise<AxiosResponse<AlbumResponse>>;

/**
 * Обрабатывает валидную отправку формы создания или редактирования альбома.
 *
 * В режиме создания (`isCreateNewAlbum`) отправляет `createAlbumFn`. Без загруженной
 * обложки показывает уведомление об ошибке вместо отправки. В режиме редактирования
 * отправляет `updateAlbumFn`, но только если данные формы отличаются от исходных
 * (`originalTitle`/`originalDescription`) — иначе просто показывает уведомление
 * об успехе, не выполняя запрос.
 *
 * @param data - Данные формы: название и описание альбома.
 * @param createAlbumFn - Функция запроса на создание альбома.
 * @param updateAlbumFn - Функция запроса на обновление альбома.
 * @param isCreateNewAlbum - Признак режима создания альбома (иначе — редактирования).
 * @param authorUUID - UUID текущего пользователя как автора альбома.
 * @param albumUUID - UUID редактируемого альбома.
 * @param dispatch - Функция записи данных в Redux.
 * @param loadedFile - Загруженный файл обложки.
 * @param imageUrl - URL уже сохранённой обложки редактируемого альбома.
 * @param originalTitle - Исходное название альбома до редактирования.
 * @param originalDescription - Исходное описание альбома до редактирования.
 * @param onSubmit - Callback, вызываемый после попытки отправки.
 */
export async function submitValidHandler(
    data: ICreateAlbumForm,
    createAlbumFn: submitCreateFn,
    updateAlbumFn: submitUpdateFn,
    isCreateNewAlbum: boolean,
    authorUUID: string,
    albumUUID: string,
    dispatch: Dispatch,
    loadedFile: File | undefined,
    imageUrl: string | undefined,
    originalTitle: string,
    originalDescription: string,
    onSubmit: () => void
) {
    if (isCreateNewAlbum) {
        if (loadedFile) {
            await createAlbumFn({
                info: {
                    title: data.title,
                    description: data.description,
                    authorUuid: authorUUID
                },
                file: loadedFile
            });
        } else {
            dispatch(showToast({ message: "toast.loadImg", type: "error" }));
        }
    } else {
        if (!loadedFile && !imageUrl) {
            dispatch(showToast({ message: "toast.loadImg", type: "error" }));
        } else {
            const isUnchanged =
                !loadedFile &&
                data.title === originalTitle &&
                data.description === originalDescription;

            if (!isUnchanged) {
                await updateAlbumFn({
                    UUID: albumUUID,
                    data: {
                        info: {
                            title: data.title,
                            description: data.description
                        },
                        file: loadedFile
                    }
                });
            } else {
                dispatch(
                    showToast({
                        message: "api.albumUpdatedSuccess",
                        type: "success"
                    })
                );
            }
        }
    }
    onSubmit();
}
