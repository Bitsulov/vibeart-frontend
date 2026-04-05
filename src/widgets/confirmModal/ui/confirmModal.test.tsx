import {describe, it, expect, vi, afterEach} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {ConfirmModal} from "./confirmModal";
import {screen, fireEvent} from "@testing-library/react";
import {defaultTransitionTime} from "shared/const/const";

describe("ConfirmModal - модальное окно подтверждения действия", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("Не рендерится, когда isShowModal = false", () => {
        renderWithProviders(
            <ConfirmModal isShowModal={false} setIsShowModal={vi.fn()} />
        );
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("Рендерится, когда isShowModal = true", () => {
        renderWithProviders(
            <ConfirmModal isShowModal={true} setIsShowModal={vi.fn()} />
        );
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("Отображает заголовок из ключа Confirm", () => {
        renderWithProviders(
            <ConfirmModal isShowModal={true} setIsShowModal={vi.fn()} />
        );
        expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("Отображает переданный текст", () => {
        renderWithProviders(
            <ConfirmModal isShowModal={true} setIsShowModal={vi.fn()} text="Удалить этот пост?" />
        );
        expect(screen.getByText("Удалить этот пост?")).toBeInTheDocument();
    });

    it("Отображает дефолтный текст из ключа questionAgreed при отсутствии text", () => {
        renderWithProviders(
            <ConfirmModal isShowModal={true} setIsShowModal={vi.fn()} />
        );
        expect(screen.getByText("questionAgreed")).toBeInTheDocument();
    });

    it("Клик по фону инициирует закрытие модалки", () => {
        vi.useFakeTimers();
        const setIsShowModal = vi.fn();
        renderWithProviders(
            <ConfirmModal isShowModal={true} setIsShowModal={setIsShowModal} />
        );

        const dialog = screen.getByRole("dialog");
        fireEvent.click(dialog.parentElement!);
        vi.advanceTimersByTime(defaultTransitionTime);

        expect(setIsShowModal).toHaveBeenCalledWith(false);
    });

    it("Клик внутри диалога не закрывает модалку (stopPropagation)", () => {
        vi.useFakeTimers();
        const setIsShowModal = vi.fn();
        renderWithProviders(
            <ConfirmModal isShowModal={true} setIsShowModal={setIsShowModal} />
        );

        fireEvent.click(screen.getByRole("dialog"));
        vi.advanceTimersByTime(defaultTransitionTime);

        expect(setIsShowModal).not.toHaveBeenCalled();
    });

    it("Клик по кнопке отмены закрывает модалку", () => {
        vi.useFakeTimers();
        const setIsShowModal = vi.fn();
        renderWithProviders(
            <ConfirmModal isShowModal={true} setIsShowModal={setIsShowModal} />
        );

        fireEvent.click(screen.getByRole("button", { name: "ariaLabel.closeLanguageModal" }));
        vi.advanceTimersByTime(defaultTransitionTime);

        expect(setIsShowModal).toHaveBeenCalledWith(false);
    });

    it("Клик по кнопке подтверждения вызывает confirmFn и закрывает модалку", () => {
        vi.useFakeTimers();
        const setIsShowModal = vi.fn();
        const confirmFn = vi.fn();
        renderWithProviders(
            <ConfirmModal isShowModal={true} setIsShowModal={setIsShowModal} confirmFn={confirmFn} />
        );

        fireEvent.click(screen.getByText("DoConfirm"));
        vi.advanceTimersByTime(defaultTransitionTime);

        expect(confirmFn).toHaveBeenCalled();
        expect(setIsShowModal).toHaveBeenCalledWith(false);
    });
});
