import type {MessageType} from "../lib/types";

/**
 * Фабричная функция для создания объекта сообщения со значениями по умолчанию.
 *
 * @param message - Объект `MessageType` с данными сообщения.
 * @returns Нормализованный объект сообщения.
 */
export function createMessage({
    id = 0,
    text = "",
    createdAt = new Date().toISOString(),
    isYour,
    isNew = false,
    status = "save"
}: MessageType) {
    return {
        id,
        text,
        createdAt,
        isYour,
        isNew,
        status,
    }
}
