import type {RefObject} from "react";

/**
 * Программно открывает диалог выбора файла.
 *
 * @param inputLoadRef - Ref скрытого input[type=file].
 */
export function loadButtonClickHandler(inputLoadRef: RefObject<HTMLInputElement | null>) {
    inputLoadRef.current?.click();
}
