import React, {type Dispatch, type SetStateAction} from "react";
import type {PostType} from "entities/post";

/**
 * Обрабатывает выбор файла: создаёт ObjectURL для предпросмотра и сохраняет файл.
 *
 * @param e - Событие изменения input[type=file].
 * @param setEntityInfo - Сеттер состояния сущности для записи imageUrl.
 * @param setLoadedFile - Сеттер загруженного файла.
 * @returns Выбранный файл или null.
 */
export function onChangeLoadHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    setEntityInfo: Dispatch<SetStateAction<Partial<PostType>>>,
    setLoadedFile?: Dispatch<SetStateAction<File | undefined>>
) {
    const file = e.target.files?.[0];

    if(file) {
        setEntityInfo(entity => ({...entity, imageUrl: URL.createObjectURL(file)}));
        setLoadedFile?.(file);
    }

    return file ?? null;
}
