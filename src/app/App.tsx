import {RouterProvider} from "./providers/routerProvider";
import {I18nProvider} from "./providers/i18nProvider";
import {StoreProvider} from "./providers/storeProvider";
import {InitProvider} from "app/providers/initProvider";
import {BrowserRouter as Router} from "react-router-dom";

/** Корневой компонент приложения: оборачивает всё дерево провайдерами. */
function App() {
    return (
        <Router>
            <StoreProvider>
                <I18nProvider>
                    <InitProvider>
                        <RouterProvider />
                    </InitProvider>
                </I18nProvider>
            </StoreProvider>
        </Router>
    )
}

export default App;
