import type {Dispatch, RefObject, SetStateAction} from "react";
import type {PostType} from "entities/post";

/**
 * Очищает input файла и сбрасывает imageUrl и загруженный файл.
 *
 * @param inputLoadRef - Ref скрытого input[type=file].
 * @param setEntityInfo - Сеттер состояния сущности для сброса imageUrl.
 * @param setLoadedFile - Сеттер загруженного файла.
 */
export function deleteButtonClickHandler(
    inputLoadRef: RefObject<HTMLInputElement | null>,
    setEntityInfo: Dispatch<SetStateAction<Partial<PostType>>>,
    setLoadedFile?: Dispatch<SetStateAction<File | undefined>>
) {
    if(inputLoadRef.current) {
        inputLoadRef.current.value = "";
        setEntityInfo(entity => ({...entity, imageUrl: ""}))
        setLoadedFile?.(undefined);
    }
}
