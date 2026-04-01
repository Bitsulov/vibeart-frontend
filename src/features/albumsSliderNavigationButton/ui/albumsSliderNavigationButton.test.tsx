import {describe, expect, it, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {AlbumsSliderNavigationButton} from "./albumsSliderNavigationButton";
import type {RefObject} from "react";
import type Swiper from "swiper";
import {screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

describe("AlbumsSliderNavigationButton - кнопка навигации слайдера с альбомами", () => {
    it("Существует на странице", () => {
        const swiperRef = {
            current: {
                slidePrev: vi.fn(),
                slideNext: vi.fn(),
            }
        } as unknown as RefObject<Swiper>;

        renderWithProviders(<AlbumsSliderNavigationButton direction="left" swiperRef={swiperRef} />);

        const button = screen.getByRole("button", {name: "ariaLabel.slideLeft"});

        expect(button).toBeInTheDocument();
    });
    it("Нажатие", async () => {
        const swiperRef = {
            current: {
                slidePrev: vi.fn(),
                slideNext: vi.fn(),
            }
        } as unknown as RefObject<Swiper>;

        renderWithProviders(<AlbumsSliderNavigationButton direction="left" swiperRef={swiperRef} />);

        const button = screen.getByRole("button", {name: "ariaLabel.slideLeft"});

        await userEvent.click(button);

        expect(swiperRef.current?.slidePrev).toHaveBeenCalledWith(500);
    });
});
