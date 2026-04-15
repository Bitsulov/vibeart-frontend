import {describe, it, expect, vi, afterEach} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {ChatDate} from "./chatDate";
import {screen} from "@testing-library/react";

afterEach(() => {
    vi.useRealTimers();
});

describe("ChatDate - отображение даты в чате", () => {
    it("Рендерится на странице", () => {
        renderWithProviders(<ChatDate date="2026-04-15T10:00:00.000Z" />);
        expect(screen.getByText("today")).toBeInTheDocument();
    });

    it("Отображает 'yesterday' для вчерашней даты", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-04-15T12:00:00.000Z"));

        renderWithProviders(<ChatDate date="2026-04-14T10:00:00.000Z" />);
        expect(screen.getByText("yesterday")).toBeInTheDocument();
    });
});
