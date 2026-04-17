import type {TagType} from "../lib/types";

/**
 * Фабричная функция для создания объекта тега со значениями по умолчанию.
 *
 * @param tag - Объект `TagType` с данными тега.
 * @returns Нормализованный объект тега.
 */
export function createTag({
    id = 0,
    title = '',
    createdAt = new Date().toISOString()
}: TagType) {
    return {
        id,
        title,
        createdAt
    }
}
