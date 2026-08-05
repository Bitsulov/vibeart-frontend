import type { Dispatch, SetStateAction } from "react";

/**
 * Проверяет наличие загруженного файла и обновляет признак ошибки изображения.
 *
 * @param file - Загруженный файл обложки альбома.
 * @param setIsErrorImg - Функция обновления признака ошибки: `true` если файл отсутствует.
 */
export function onSubmitForm(
    file: File | undefined,
    setIsErrorImg: Dispatch<SetStateAction<boolean>>
) {
    if (!file) {
        setIsErrorImg(true);
    } else {
        setIsErrorImg(false);
    }
}
