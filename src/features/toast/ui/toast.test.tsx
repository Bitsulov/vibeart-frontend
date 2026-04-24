import {describe, it, expect} from "vitest";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {Toast} from "./toast";

describe("Toast - всплывающее уведомление", () => {
    it("Не рендерится, если очередь пустая", () => {
        renderWithProviders(<Toast />);

        expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });
    it("Отображает сообщение из первого уведомления в очереди", () => {
        renderWithProviders(<Toast />, {
            preloadedState: {
                toast: {queue: [{id: "1", message: "toast.loadImg", type: "error"}]}
            }
        });

        expect(screen.getByText("toast.loadImg")).toBeInTheDocument();
    });
    it("Отображает первое уведомление при нескольких в очереди", () => {
        renderWithProviders(<Toast />, {
            preloadedState: {
                toast: {
                    queue: [
                        {id: "1", message: "first message", type: "error"},
                        {id: "2", message: "second message", type: "success"},
                    ]
                }
            }
        });

        expect(screen.getByText("first message")).toBeInTheDocument();
        expect(screen.queryByText("second message")).not.toBeInTheDocument();
    });
});
