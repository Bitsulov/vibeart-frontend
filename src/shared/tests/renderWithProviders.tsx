import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { configureStore } from "@reduxjs/toolkit";
import { type RootState } from "app/store";
import {rootReducer} from "app/store/rootReducer";
import i18n from "../tests/i18n";

interface Options extends RenderOptions {
    preloadedState?: Partial<RootState>
    route?: string
}

export function renderWithProviders(
    ui: ReactElement,
    { preloadedState, route = '/', ...options }: Options = {}
) {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
    })

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <MemoryRouter initialEntries={[route]}>
                        {children}
                    </MemoryRouter>
                </I18nextProvider>
            </Provider>
    )

    return { store, ...render(ui, { wrapper: Wrapper, ...options }) }
}
