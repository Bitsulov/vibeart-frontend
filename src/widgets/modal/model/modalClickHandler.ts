import React from "react";

/** Предотвращает закрытие модального окна при клике внутри неё. */
export function modalClickHandler(e: React.MouseEvent) {
    e.stopPropagation();
}
