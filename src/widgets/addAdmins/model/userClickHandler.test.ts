import { describe, it, expect, vi } from "vitest";
import type { MouseEvent } from "react";
import { userClickHandler } from "./userClickHandler";
import { principalUserMock, profileUserMock } from "entities/user";

describe("userClickHandler - переключение выбора администратора", () => {
    it("Вызывает preventDefault", () => {
        const e = { preventDefault: vi.fn() } as unknown as MouseEvent;

        userClickHandler(e, [], vi.fn(), principalUserMock);

        expect(e.preventDefault).toHaveBeenCalled();
    });

    it("Добавляет пользователя если он не выбран", () => {
        const e = { preventDefault: vi.fn() } as unknown as MouseEvent;
        const setSelectedAdmins = vi.fn();

        userClickHandler(e, [], setSelectedAdmins, principalUserMock);

        const updater = setSelectedAdmins.mock.calls[0][0];
        expect(updater([])).toEqual([principalUserMock]);
    });

    it("Удаляет пользователя если он уже выбран", () => {
        const e = { preventDefault: vi.fn() } as unknown as MouseEvent;
        const setSelectedAdmins = vi.fn();

        userClickHandler(e, [principalUserMock], setSelectedAdmins, principalUserMock);

        const updater = setSelectedAdmins.mock.calls[0][0];
        expect(updater([principalUserMock])).toEqual([]);
    });

    it("Удаляет пользователя по UUID, даже если это другой объект с теми же данными", () => {
        const e = { preventDefault: vi.fn() } as unknown as MouseEvent;
        const setSelectedAdmins = vi.fn();
        const sameUserNewReference = { ...principalUserMock };

        userClickHandler(e, [principalUserMock], setSelectedAdmins, sameUserNewReference);

        const updater = setSelectedAdmins.mock.calls[0][0];
        expect(updater([principalUserMock])).toEqual([]);
    });

    it("Удаляет только нужного пользователя из списка", () => {
        const e = { preventDefault: vi.fn() } as unknown as MouseEvent;
        const setSelectedAdmins = vi.fn();

        userClickHandler(
            e,
            [principalUserMock, profileUserMock],
            setSelectedAdmins,
            principalUserMock
        );

        const updater = setSelectedAdmins.mock.calls[0][0];
        expect(updater([principalUserMock, profileUserMock])).toEqual([profileUserMock]);
    });
});
