import type {Dispatch} from "@reduxjs/toolkit";
import type {FieldErrors} from "react-hook-form";
import {showToast} from "features/toast";
import type {ICreatePostForm} from "../lib/types";

/**
 * Показывает уведомление с первой ошибкой валидации формы создания поста.
 *
 * @param errors - Объект ошибок react-hook-form.
 * @param dispatch - Redux dispatch.
 */
export function submitInvalidHandler(
    errors: FieldErrors<ICreatePostForm>,
    dispatch: Dispatch
) {
    const error = errors.title || errors.description || errors.img;

    if (error?.message) {
        dispatch(showToast({message: error.message, type: "error"}));
    }
}
