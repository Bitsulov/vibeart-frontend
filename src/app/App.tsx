import {RouterProvider} from "./providers/routerProvider";
import {I18nProvider} from "./providers/Ii18nProvider";
import {StoreProvider} from "./providers/storeProvider";

function App() {
    return (
        <StoreProvider>
            <I18nProvider>
                <RouterProvider />
            </I18nProvider>
        </StoreProvider>
    )
}

export default App;
