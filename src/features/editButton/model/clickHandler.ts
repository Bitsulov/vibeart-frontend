import React from "react";

export function clickHandler(onClick: () => void, onMouseLeave: React.MouseEventHandler, e: React.MouseEvent) {
    onMouseLeave(e);
    onClick();
}
