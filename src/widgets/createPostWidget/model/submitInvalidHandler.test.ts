import {describe, it, expect, vi} from "vitest";
import {submitInvalidHandler} from "./submitInvalidHandler";

describe("submitInvalidHandler - обработчик некорректной отправки формы", () => {
    it("Показывает уведомление, если у ошибки есть сообщение", () => {
        const dispatch = vi.fn();

        submitInvalidHandler({title: {message: "toast.emptyTitle", type: "required"}}, dispatch);

        expect(dispatch).toHaveBeenCalled();
    });
    it("Показывает уведомление для ошибки description", () => {
        const dispatch = vi.fn();

        submitInvalidHandler({description: {message: "toast.longDescription", type: "maxLength"}}, dispatch);

        expect(dispatch).toHaveBeenCalled();
    });
    it("Не показывает уведомление, если сообщение пустое", () => {
        const dispatch = vi.fn();

        submitInvalidHandler({title: {message: "", type: "required"}}, dispatch);

        expect(dispatch).not.toHaveBeenCalled();
    });
    it("Не показывает уведомление если ошибок нет", () => {
        const dispatch = vi.fn();

        submitInvalidHandler({}, dispatch);

        expect(dispatch).not.toHaveBeenCalled();
    });
});
