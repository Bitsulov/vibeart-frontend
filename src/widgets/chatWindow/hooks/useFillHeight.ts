import { useEffect, useRef, useState } from "react";

/**
 * Вычисляет высоту элемента так, чтобы он занимал всё пространство до нижнего края экрана.
 *
 * @returns `ref` — ref для целевого элемента; `height` — вычисленная высота в px.
 */
export const useFillHeight = <T extends HTMLElement>() => {
    const ref = useRef<T>(null);
    const [height, setHeight] = useState<number | undefined>(undefined);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const update = () => {
            const { top } = el.getBoundingClientRect();
            const marginBottom = parseFloat(getComputedStyle(el).marginBottom);
            setHeight(window.innerHeight - top - marginBottom);
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return { ref, height };
};
