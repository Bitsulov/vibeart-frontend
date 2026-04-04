import React from "react";

interface IMousePosition {
    x: number;
    y: number;
}

export const getHintPosition = (
    hintRef: React.RefObject<HTMLParagraphElement | null>,
    mousePosition: IMousePosition
) => {
    const width = hintRef.current?.offsetWidth ?? 0;
    const height = hintRef.current?.offsetHeight ?? 0;

    const goToRight = mousePosition.x + 10 + width > window.innerWidth;
    const goToTop = mousePosition.y - height - 10 < 0;

    const left = goToRight ? mousePosition.x - width - 10 : mousePosition.x + 10;
    const top = goToTop ? mousePosition.y + 10 : mousePosition.y - height - 10;

    return {left, top};
};
