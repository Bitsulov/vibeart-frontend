/** Функция мутации добавления публикаций в альбом. */
type AddPostsFn = (data: { UUID: string; data: string[] }) => void;

/**
 * Отправляет выбранные публикации на добавление в альбом.
 *
 * @param addPostsFn - Функция мутации добавления публикаций в альбом.
 * @param albumUUID - UUID альбома.
 * @param selectedPosts - Список UUID выбранных публикаций.
 */
export function addSelectedPostsHandler(
    addPostsFn: AddPostsFn,
    albumUUID: string,
    selectedPosts: string[]
) {
    addPostsFn({ UUID: albumUUID, data: selectedPosts });
}
