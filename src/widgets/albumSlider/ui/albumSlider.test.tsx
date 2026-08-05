import { describe, expect, it, vi } from "vitest";
import { act, screen } from "@testing-library/react";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { AlbumSlider } from "./albumSlider";
import { createAlbum } from "entities/album";

const mockSwiperState = vi.hoisted(() => ({
    onSlideChange: null as ((swiper: any) => void) | null,
    onSwiper: null as ((swiper: any) => void) | null
}));

vi.mock("swiper/react", () => ({
    Swiper: ({ children, onSlideChange, onSwiper }: any) => {
        mockSwiperState.onSlideChange = onSlideChange;
        mockSwiperState.onSwiper = onSwiper;
        return <div data-testid="swiper">{children}</div>;
    },
    SwiperSlide: ({ children }: any) => <div>{children}</div>
}));

vi.mock("swiper/css", () => ({}));
vi.mock("swiper/css/navigation", () => ({}));

const mockAlbums = [
    createAlbum({
        UUID: "00000000-0000-4000-8000-000000000001",
        name: "Пейзажи",
        imageUrl: "",
        description: "",
        postCount: 0,
        postsList: [],
        createdAt: "2026-01-01T00:00:00.000Z"
    }),
    createAlbum({
        UUID: "00000000-0000-4000-8000-000000000002",
        name: "Портреты",
        imageUrl: "",
        description: "",
        postCount: 0,
        postsList: [],
        createdAt: "2026-01-01T00:00:00.000Z"
    })
];

const defaultProps = {
    albumsList: mockAlbums,
    setSelectedAlbum: vi.fn(),
    selectedAlbum: "all"
};

describe("AlbumSlider - слайдер альбомов пользователя", () => {
    describe("Наличие слайдов", () => {
        it("Отображает слайд «Все»", () => {
            renderWithProviders(<AlbumSlider {...defaultProps} />);

            expect(
                screen.getByRole("button", { name: "ariaLabel.chooseAll" })
            ).toBeInTheDocument();
        });

        it("Отображает слайды для каждого альбома", () => {
            renderWithProviders(<AlbumSlider {...defaultProps} />);

            expect(screen.getByText("Пейзажи")).toBeInTheDocument();
            expect(screen.getByText("Портреты")).toBeInTheDocument();
        });

        it("Отображает слайд добавления альбома", () => {
            renderWithProviders(<AlbumSlider {...defaultProps} />);

            expect(
                screen.getByRole("link", { name: "ariaLabel.goToCreateAlbumPage" })
            ).toBeInTheDocument();
        });

        it("Количество слайдов равно albumsList.length + 2 (все + добавить)", () => {
            renderWithProviders(<AlbumSlider {...defaultProps} />);

            // Уборка навигационных кнопок
            const albumButtons = screen
                .getAllByRole("button")
                .filter(
                    btn =>
                        btn.getAttribute("aria-label") !== "ariaLabel.slideLeft" &&
                        btn.getAttribute("aria-label") !== "ariaLabel.slideRight"
                );

            // AlbumAdd это ссылка, а не кнопка
            expect(albumButtons).toHaveLength(mockAlbums.length + 1);
        });
    });

    describe("Навигация: начало слайдера", () => {
        it("Левая кнопка disabled в начале", () => {
            renderWithProviders(<AlbumSlider {...defaultProps} />);

            const leftButton = screen.getByRole("button", {
                name: "ariaLabel.slideLeft"
            });

            expect(leftButton.className).toContain("disabled");
        });

        it("Правая кнопка не disabled в начале", () => {
            renderWithProviders(<AlbumSlider {...defaultProps} />);

            const rightButton = screen.getByRole("button", {
                name: "ariaLabel.slideRight"
            });

            expect(rightButton.className).not.toContain("disabled");
        });
    });

    describe("Навигация: конец слайдера", () => {
        it("Правая кнопка disabled в конце", () => {
            renderWithProviders(<AlbumSlider {...defaultProps} />);

            act(() => {
                mockSwiperState.onSlideChange?.({ isBeginning: false, isEnd: true });
            });

            const rightButton = screen.getByRole("button", {
                name: "ariaLabel.slideRight"
            });

            expect(rightButton.className).toContain("disabled");
        });

        it("Левая кнопка не disabled в конце", () => {
            renderWithProviders(<AlbumSlider {...defaultProps} />);

            act(() => {
                mockSwiperState.onSlideChange?.({ isBeginning: false, isEnd: true });
            });

            const leftButton = screen.getByRole("button", {
                name: "ariaLabel.slideLeft"
            });

            expect(leftButton.className).not.toContain("disabled");
        });
    });

    describe("Навигация: середина слайдера", () => {
        it("Обе кнопки не disabled в середине", () => {
            renderWithProviders(<AlbumSlider {...defaultProps} />);

            act(() => {
                mockSwiperState.onSlideChange?.({ isBeginning: false, isEnd: false });
            });

            const leftButton = screen.getByRole("button", {
                name: "ariaLabel.slideLeft"
            });
            const rightButton = screen.getByRole("button", {
                name: "ariaLabel.slideRight"
            });

            expect(leftButton.className).not.toContain("disabled");
            expect(rightButton.className).not.toContain("disabled");
        });
    });

    describe("Дозагрузка альбомов при получении новых данных", () => {
        it("Запускает onReachEnd, если загруженных альбомов всё ещё меньше, чем видно слайдов", () => {
            const onReachEnd = vi.fn();
            const fakeSwiper = {
                isBeginning: true,
                isEnd: true,
                activeIndex: 0,
                params: { slidesPerView: 3 },
                update: vi.fn()
            };

            const { rerender } = renderWithProviders(
                <AlbumSlider
                    {...defaultProps}
                    albumsList={[mockAlbums[0]]}
                    onReachEnd={onReachEnd}
                />
            );

            act(() => {
                mockSwiperState.onSwiper?.(fakeSwiper);
            });

            rerender(
                <AlbumSlider
                    {...defaultProps}
                    albumsList={mockAlbums}
                    onReachEnd={onReachEnd}
                />
            );

            expect(onReachEnd).toHaveBeenCalled();
        });

        it("Не запускает onReachEnd, если видимые слоты уже заполнены загруженными альбомами", () => {
            const onReachEnd = vi.fn();
            const fakeSwiper = {
                isBeginning: true,
                isEnd: true,
                activeIndex: 0,
                params: { slidesPerView: 1 },
                update: vi.fn()
            };

            const { rerender } = renderWithProviders(
                <AlbumSlider
                    {...defaultProps}
                    albumsList={[mockAlbums[0]]}
                    onReachEnd={onReachEnd}
                />
            );

            act(() => {
                mockSwiperState.onSwiper?.(fakeSwiper);
            });

            rerender(
                <AlbumSlider
                    {...defaultProps}
                    albumsList={mockAlbums}
                    onReachEnd={onReachEnd}
                />
            );

            expect(onReachEnd).not.toHaveBeenCalled();
        });
    });
});
