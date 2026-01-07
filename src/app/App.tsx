import "./App.scss";
import { StoreProvider } from "./providers/storeProvider";
import RouterProvider from "./providers/routerProvider";
import { InitProvider } from "./providers/initProvider";
import type { ReactNode } from "react";
import { I18nProvider } from "./providers/I18nProvider";

function App(): ReactNode {
    return (
        <StoreProvider>
            <I18nProvider>
				<InitProvider>
					<RouterProvider />
				</InitProvider>
			</I18nProvider>
        </StoreProvider>
    );
}

export default App;
