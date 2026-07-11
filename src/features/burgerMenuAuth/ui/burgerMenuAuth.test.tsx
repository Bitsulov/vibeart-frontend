import { describe, expect, it } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { BurgerMenuAuth } from "./burgerMenuAuth";
import c from "./burgerMenuAuth.module.scss";

describe("burgerMenuAuth - бургер меню (пользователь авторизован)", () => {
    it("Ссылки для админа нет", () => {
        renderWithProviders(
            <Routes>
                <Route path="/" element={<BurgerMenuAuth />} />
            </Routes>,
            {
                preloadedState: {
                    user: {
                        UUID: "00000000-0000-4000-8000-00000000000b",
                        email: "testEmail@test.com",
                        name: "testUser",
                        username: "testUser",
                        avatarUrl: "",
                        trustStatus: "TRUST",
                        isAuthenticated: true,
                        isBlocked: false,
                        role: "USER",
                        accessToken: "",
                        refreshToken: "",
                        accessTokenExpiresIn: 0,
                        refreshTokenExpiresIn: 0
                    }
                }
            }
        );

        const link = screen.queryByRole("link", { name: "ariaLabel.goToAdmin" });
        expect(link).not.toBeInTheDocument();
    });
    it("Ссылка для админа есть, ariaLabel есть", () => {
        renderWithProviders(
            <Routes>
                <Route path="/" element={<BurgerMenuAuth />} />
            </Routes>,
            {
                preloadedState: {
                    user: {
                        UUID: "00000000-0000-4000-8000-00000000000b",
                        email: "testEmail@test.com",
                        name: "testUser",
                        username: "testUser",
                        avatarUrl: "",
                        trustStatus: "TRUST",
                        isAuthenticated: true,
                        isBlocked: false,
                        role: "ADMIN",
                        accessToken: "",
                        refreshToken: "",
                        accessTokenExpiresIn: 0,
                        refreshTokenExpiresIn: 0
                    }
                }
            }
        );

        const link = screen.getByRole("link", { name: "ariaLabel.goToAdmin" });
        expect(link).toBeInTheDocument();
    });
    it("Проверка aria-current и класса", () => {
        renderWithProviders(
            <Routes>
                <Route path="/:lang/profile/:uuid" element={<BurgerMenuAuth />} />
            </Routes>,
            {
                route: "/en/profile/123",
                preloadedState: {
                    user: {
                        UUID: "123",
                        email: "testEmail@test.com",
                        name: "testUser",
                        username: "testUser",
                        avatarUrl: "",
                        trustStatus: "TRUST",
                        isAuthenticated: true,
                        isBlocked: false,
                        role: "ADMIN",
                        accessToken: "",
                        refreshToken: "",
                        accessTokenExpiresIn: 0,
                        refreshTokenExpiresIn: 0
                    }
                }
            }
        );

        const link = screen.getByRole("link", { current: "page" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveClass(`${c.nav_burger_item} ${c.active}`);
    });
});
