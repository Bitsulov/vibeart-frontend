import type Swiper from "swiper";

/**
 * Проверяет, стал ли виден последний загруженный альбом, и если да —
 * запускает загрузку следующей страницы через `onReachEnd`.
 *
 * Слайд «Все работы» занимает индекс `0`, поэтому реальные альбомы находятся
 * на индексах `1..albumsCount`. Проверка не учитывает завершающий слайд
 * добавления альбома — срабатывает раньше, чем он попадает в область видимости.
 *
 * @param swiper - Текущий экземпляр Swiper.
 * @param albumsCount - Количество уже загруженных альбомов.
 * @param onReachEnd - Функция загрузки следующей страницы альбомов.
 */
export function reachEndSwiperHandler(
    swiper: Swiper,
    albumsCount: number,
    onReachEnd: () => void
) {
    const slidesPerView =
        typeof swiper.params?.slidesPerView === "number"
            ? swiper.params.slidesPerView
            : 1;

    if (swiper.activeIndex + slidesPerView > albumsCount) {
        onReachEnd();
    }
}
