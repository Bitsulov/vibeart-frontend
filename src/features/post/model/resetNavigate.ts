import React from "react";

/**
 * Останавливает всплытие события клика, предотвращая нежелательную навигацию.
 *
 * @param e - Событие клика мыши.
 */
export function resetNavigate(e: React.MouseEvent) {
    e.stopPropagation();
}
