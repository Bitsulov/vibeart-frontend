/**
 * Запускает загрузку следующей страницы альбомов, если она ещё не запущена
 * и есть что загружать.
 *
 * @param hasNextPage - Признак наличия следующей страницы альбомов.
 * @param isFetchingNextPage - Признак того, что загрузка уже выполняется.
 * @param fetchNextPage - Функция запроса следующей страницы альбомов.
 */
export function loadMoreAlbumsHandler(
    hasNextPage: boolean | undefined,
    isFetchingNextPage: boolean,
    fetchNextPage: () => void
) {
    if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
    }
}
