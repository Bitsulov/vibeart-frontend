import { describe, it, expect, vi } from "vitest";
import { onSubmitForm } from "./onSubmitForm";

describe("onSubmitForm - обработка отправки формы создания альбома", () => {
    it("Устанавливает ошибку, если файл не загружен", () => {
        const setIsErrorImg = vi.fn();

        onSubmitForm(undefined, setIsErrorImg);

        expect(setIsErrorImg).toHaveBeenCalledWith(true);
    });

    it("Сбрасывает ошибку, если файл загружен", () => {
        const setIsErrorImg = vi.fn();
        const file = new File(["content"], "image.png", { type: "image/png" });

        onSubmitForm(file, setIsErrorImg);

        expect(setIsErrorImg).toHaveBeenCalledWith(false);
    });
});
