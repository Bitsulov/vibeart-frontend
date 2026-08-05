import { useEffect, useState } from "react";

/**
 * Возвращает значение, обновляемое с задержкой после последнего изменения.
 * Полезно для полей поиска, чтобы не запускать запрос на каждое нажатие клавиши.
 *
 * @param value - Исходное значение, изменения которого нужно отложить.
 * @param delay - Задержка в миллисекундах перед применением нового значения.
 * @returns Значение, обновляемое не чаще, чем раз в `delay` миллисекунд.
 */
const useDebouncedValue = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timeoutId);
    }, [value, delay]);

    return debouncedValue;
};

export { useDebouncedValue };
