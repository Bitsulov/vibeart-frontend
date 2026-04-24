import {describe, it, expect, vi} from "vitest";
import {submitValidHandler} from "./submitValidHandler";

describe("submitValidHandler - обработчик успешной отправки формы создания поста", () => {
    it("Перенаправляет в /gallery если файл загружен", () => {
        const navigate = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();
        const file = new File(["content"], "image.png", {type: "image/png"});

        submitValidHandler(navigate, dispatch, file, onSubmit);

        expect(navigate).toHaveBeenCalledWith("/gallery", {replace: true});
        expect(dispatch).not.toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalled();
    });
    it("Показывает уведомление если файл не загружен", () => {
        const navigate = vi.fn();
        const dispatch = vi.fn();
        const onSubmit = vi.fn();

        submitValidHandler(navigate, dispatch, undefined, onSubmit);

        expect(navigate).not.toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalled();
    });
});
