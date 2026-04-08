import {describe, it, expect, vi} from "vitest";
import {renderWithProviders} from "shared/tests/renderWithProviders";
import {EditButton} from "./editButton";
import {screen, fireEvent} from "@testing-library/react";

const POST_ULID = "01ARZ3NDEKTSV4RRFFQ69G5FAV";

describe("EditButton - кнопка редактирования поста", () => {
    it("Рендерится как ссылка", () => {
        renderWithProviders(<EditButton ULID={POST_ULID} type="post" ariaLabel="Редактировать пост" />);
        expect(screen.getByRole("link", { name: "Редактировать пост" })).toBeInTheDocument();
    });

    it("Ссылка ведет на страницу редактирования поста", () => {
        renderWithProviders(<EditButton ULID={POST_ULID} type="post" ariaLabel="Редактировать пост" />);
        const link = screen.getByRole("link", { name: "Редактировать пост" });
        expect(link).toHaveAttribute("href", `/post/${POST_ULID}/edit`);
    });

    it("Вызывает onClick и onMouseLeave при клике", () => {
        const onClick = vi.fn();
        const onMouseLeave = vi.fn();
        renderWithProviders(
            <EditButton ULID={POST_ULID} type="post" ariaLabel="Редактировать" onClick={onClick} onMouseLeave={onMouseLeave} />
        );
        fireEvent.click(screen.getByRole("link", { name: "Редактировать" }));
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it("Принимает дополнительный className", () => {
        renderWithProviders(<EditButton ULID={POST_ULID} type="post" ariaLabel="Редактировать" className="extra" />);
        const link = screen.getByRole("link", { name: "Редактировать" });
        expect(link.className).toContain("extra");
    });
});
