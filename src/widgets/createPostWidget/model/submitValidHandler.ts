import type {NavigateFunction} from "react-router-dom";
import type {Dispatch} from "@reduxjs/toolkit";
import {showToast} from "features/toast";

/**
 * Обрабатывает валидную отправку формы создания поста.
 * При наличии изображения переходит в галерею, иначе показывает уведомление об ошибке.
 *
 * @param navigate - Функция навигации React Router.
 * @param dispatch - Redux dispatch.
 * @param loadedFile - Загруженный файл изображения.
 * @param onSubmit - Callback, вызываемый после попытки отправки.
 */
export function submitValidHandler(
    // data: ICreatePostForm,
    navigate: NavigateFunction,
    dispatch: Dispatch,
    loadedFile: File | undefined,
    onSubmit: () => void
) {
    if(loadedFile) {
        navigate("/gallery", {replace: true});
    } else {
        dispatch(showToast({message: "toast.loadImg", type: "error"}));
    }
    onSubmit();
}
