import { useEffect, useState } from "react";

/**
 * Возвращает текущую ширину окна браузера и обновляется при изменении размера.
 *
 * @returns {string}
 */
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
};

export { useWindowWidth };
