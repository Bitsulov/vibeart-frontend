/**
 * Запускает загрузку следующей страницы сообществ, если элемент-триггер виден
 * во viewport, есть что загружать и загрузка ещё не выполняется.
 *
 * @param inView - Признак пересечения элемента-триггера с viewport.
 * @param hasNextPage - Признак наличия следующей страницы сообществ.
 * @param isFetchingNextPage - Признак того, что загрузка уже выполняется.
 * @param fetchNextPage - Функция запроса следующей страницы сообществ.
 */
export function loadMoreCommunitiesHandler(
    inView: boolean,
    hasNextPage: boolean | undefined,
    isFetchingNextPage: boolean,
    fetchNextPage: () => void
) {
    if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
    }
}
