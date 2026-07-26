import type { Dispatch, SetStateAction } from "react";

/**
 * Фиксирует успешную отправку жалобы: отмечает, что жалоба отправлена, и увеличивает счётчик.
 *
 * @param setIsReported - Сеттер состояния отправки жалобы.
 * @param setReports - Сеттер количества жалоб.
 */
export function reportSuccessHandler(
    setIsReported: Dispatch<SetStateAction<boolean>>,
    setReports: Dispatch<SetStateAction<number>>
) {
    setIsReported(true);
    setReports(reports => reports + 1);
}
