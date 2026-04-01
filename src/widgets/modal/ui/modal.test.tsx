import {describe, it, expect, vi, afterEach} from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { Modal } from "./modal";
import { screen, fireEvent } from "@testing-library/react";
import { defaultTransitionTime } from "shared/const/const";

const languagesConfig: Record<string, string[]> = {
    ru: ["ru.png", "Русский", "Выбрать русский", "Флаг России", "ru"],
    en: ["en.png", "English", "Select English", "UK Flag", "en"],
};

describe("Modal - модальное окно выбора языка", () => {
    afterEach(() => {
        vi.useRealTimers();
    });
    
    it("Не рендерится, когда isShowChangeLanguage = false", () => {
        renderWithProviders(
            <Modal
                isShowChangeLanguage={false}
                setIsShowChangeLanguage={vi.fn()}
                languagesConfig={languagesConfig}
            />
        );

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("Рендерится, когда isShowChangeLanguage = true", () => {
        renderWithProviders(
            <Modal
                isShowChangeLanguage={true}
                setIsShowChangeLanguage={vi.fn()}
                languagesConfig={languagesConfig}
            />
        );

        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("Отображает языки из languagesConfig", () => {
        renderWithProviders(
            <Modal
                isShowChangeLanguage={true}
                setIsShowChangeLanguage={vi.fn()}
                languagesConfig={languagesConfig}
            />
        );

        expect(screen.getByText("Русский")).toBeInTheDocument();
        expect(screen.getByText("English")).toBeInTheDocument();
    });

    it("Клик по фону запускает закрытие модалки", () => {
        vi.useFakeTimers();
        const setIsShowChangeLanguage = vi.fn();

        renderWithProviders(
            <Modal
                isShowChangeLanguage={true}
                setIsShowChangeLanguage={setIsShowChangeLanguage}
                languagesConfig={languagesConfig}
            />
        );

        const dialog = screen.getByRole("dialog");
        fireEvent.click(dialog.parentElement!);

        vi.advanceTimersByTime(defaultTransitionTime);

        expect(setIsShowChangeLanguage).toHaveBeenCalledWith(false);
    });

    it("Клик по кнопке закрытия запускает закрытие модалки", () => {
        vi.useFakeTimers();
        const setIsShowChangeLanguage = vi.fn();

        renderWithProviders(
            <Modal
                isShowChangeLanguage={true}
                setIsShowChangeLanguage={setIsShowChangeLanguage}
                languagesConfig={languagesConfig}
            />
        );

        const closeButton = screen.getByRole("button", { name: "ariaLabel.closeLanguageModal" });
        fireEvent.click(closeButton);

        vi.advanceTimersByTime(defaultTransitionTime);

        expect(setIsShowChangeLanguage).toHaveBeenCalledWith(false);
    });

    it("Клик внутри диалога не закрывает модалку (stopPropagation)", () => {
        vi.useFakeTimers();
        const setIsShowChangeLanguage = vi.fn();

        renderWithProviders(
            <Modal
                isShowChangeLanguage={true}
                setIsShowChangeLanguage={setIsShowChangeLanguage}
                languagesConfig={languagesConfig}
            />
        );

        const dialog = screen.getByRole("dialog");
        fireEvent.click(dialog);

        vi.advanceTimersByTime(defaultTransitionTime);

        expect(setIsShowChangeLanguage).not.toHaveBeenCalled();
    });
});