import { useEffect, useState } from "react";

interface IMousePosition {
    x: number;
    y: number;
}

/**
 * Возвращает текущие координаты курсора мыши относительно страницы.
 *
 * @returns {{ x: number, y: number }}
 */
export const useMousePosition = (): IMousePosition => {
    const [position, setPosition] = useState<IMousePosition>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setPosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return position;
}
