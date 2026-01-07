import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "flag-icons/css/flag-icons.min.css";
import App from "app/App";

const rootElement = document.getElementById("root");

if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} else {
    console.error("⚠️ Root element not found. Приложение не будет смонтировано.");
    alert("Ошибка! Попробуйте перезагрузить страницу");
}
