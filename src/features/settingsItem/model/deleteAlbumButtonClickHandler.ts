import type { Dispatch, RefObject, SetStateAction } from "react";

/**
 * Удаляет выбранное изображение: очищает скрытый `input[type=file]`,
 * очищает поле `fieldName` в объекте состояния и сбрасывает загруженный файл.
 *
 * @param inputLoadRef - Ссылка на скрытый `input[type=file]`.
 * @param setEntityInfo - Сеттер состояния объекта.
 * @param setLoadedFile - Сеттер загруженного файла.
 * @param fieldName - Имя поля сущности, которое нужно очистить. По умолчанию `"avatarUrl"`.
 * @param onAvatarDelete - Callback, выполняемый после удаления файла аватара
 */
export function deleteAlbumButtonClickHandler<T extends object>(
    inputLoadRef: RefObject<HTMLInputElement | null>,
    setEntityInfo: Dispatch<SetStateAction<T>>,
    setLoadedFile?: Dispatch<SetStateAction<File | undefined>>,
    fieldName: string = "avatarUrl",
    onAvatarDelete?: () => void
) {
    if (inputLoadRef.current) {
        inputLoadRef.current.value = "";
        setEntityInfo(entity => ({ ...entity, [fieldName]: "" }) as T);
        setLoadedFile?.(undefined);
        if (onAvatarDelete) {
            onAvatarDelete();
        }
    }
}
