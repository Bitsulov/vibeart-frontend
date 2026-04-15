import {describe, it, expect} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {MessageItem} from "./messageItem";
import {screen} from "@testing-library/react";

const defaultProps = {
    isYour: false,
    text: "Lorem ipsum dolor sit amet.",
    date: "2026-04-15T14:30:00.000Z",
    status: "read" as const,
};

describe("MessageItem - элемент сообщения в чате", () => {
    it("Отображает текст сообщения", () => {
        renderWithProviders(<MessageItem {...defaultProps} />);
        expect(screen.getByText("Lorem ipsum dolor sit amet.")).toBeInTheDocument();
    });

    it("Отображает время сообщения", () => {
        renderWithProviders(<MessageItem {...defaultProps} />);
        expect(screen.getByText(/\d{2}:\d{2}/)).toBeInTheDocument();
    });

    it("Не показывает иконку статуса для чужого сообщения", () => {
        renderWithProviders(<MessageItem {...defaultProps} isYour={false} />);
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("Показывает иконку статуса для своего сообщения", () => {
        renderWithProviders(<MessageItem {...defaultProps} isYour={true} />);
        const svg = document.querySelector("svg");
        expect(svg).toBeInTheDocument();
    });
});
