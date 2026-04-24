import {describe, it, expect} from "vitest";
import {ToastReducer, showToast, hideToast} from "./toastSlice";

describe("toastSlice - Redux slice всплывающего уведомления", () => {
    it("showToast добавляет уведомление в очередь", () => {
        const state = ToastReducer(undefined, showToast({message: "test", type: "error"}));

        expect(state.queue).toHaveLength(1);
        expect(state.queue[0].message).toBe("test");
        expect(state.queue[0].type).toBe("error");
    });
    it("showToast не добавляет дубликат с тем же message и type", () => {
        let state = ToastReducer(undefined, showToast({message: "test", type: "error"}));
        state = ToastReducer(state, showToast({message: "test", type: "error"}));

        expect(state.queue).toHaveLength(1);
    });
    it("showToast добавляет уведомление с тем же message но другим type", () => {
        let state = ToastReducer(undefined, showToast({message: "test", type: "error"}));
        state = ToastReducer(state, showToast({message: "test", type: "success"}));

        expect(state.queue).toHaveLength(2);
    });
    it("hideToast удаляет первое уведомление из очереди", () => {
        let state = ToastReducer(undefined, showToast({message: "first", type: "error"}));
        state = ToastReducer(state, showToast({message: "second", type: "success"}));
        state = ToastReducer(state, hideToast());

        expect(state.queue).toHaveLength(1);
        expect(state.queue[0].message).toBe("second");
    });
    it("hideToast на пустой очереди не падает", () => {
        const state = ToastReducer(undefined, hideToast());

        expect(state.queue).toHaveLength(0);
    });
});
