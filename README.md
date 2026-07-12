# VibeArt — Frontend

Социальная сеть для творческих людей: публикация работ, альбомы, сообщества и обратная связь.

> Этот репозиторий является подмодулем основного репозитория [VibeArt](https://github.com/Bitsulov/VibeArt.git), который запускается через Docker Compose.

---

## Быстрый старт

Скопируй `.env.example` в `.env` и заполни переменные:

| Переменная       | Описание                                |
|------------------|-----------------------------------------|
| `VITE_URL`       | Публичный URL сайта                     |
| `VITE_API_BASE`  | Базовый URL API бэкенда                 |
| `VITE_EMAIL`     | Контактный email, отображаемый на сайте |
| `VITE_CRYPTO_KEY`| Ключ AES-GCM для шифрования токенов авторизации в cookies |

```bash
cp .env.example .env
```

### Режим разработки
```bash
npm install
npm run dev
```

### Режим предпросмотра
```bash
npm install
npm run build
npm run preview
```

---

## Команды

| Команда                  | Описание                           |
|--------------------------|------------------------------------|
| `npm run dev`            | Запуск dev-сервера                 |
| `npm run build`          | Сборка проекта                     |
| `npm run lint`           | Линтинг                            |
| `npm run typecheck`      | Проверка типов                     |
| `npm run test`           | Юнит-тесты в watch-режиме          |
| `npm run test:run`       | Однократный запуск юнит-тестов     |
| `npm run test:coverage`  | Покрытие (порог 75%)               |
| `npm run test:ui`        | UI-дашборд Vitest                  |
| `npm run test:e2e`       | E2E-тесты (Playwright)             |
| `npm run test:e2e:ui`    | UI-дашборд Playwright              |
| `npm run test:e2e:debug` | Отладка E2E-тестов                 |
| `npm run test:e2e:webkit`| E2E-тесты WebKit (на Windows — через WSL) |
| `npm run test:e2e:webkit:update` | Обновление baseline-скриншотов WebKit (на Windows — через WSL) |
| `npm run test:all`       | lint + tsc + vitest + playwright   |

---

## Стек технологий

**Основное**
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Router v7](https://reactrouter.com/) — роутинг и SSR
- [Vite](https://vitejs.dev/) — сборщик
- [SCSS Modules](https://sass-lang.com/) — стилизация

**Стейт и данные**
- [Redux Toolkit](https://redux-toolkit.js.org/) — клиентский стейт
- [TanStack Query](https://tanstack.com/query) — серверные данные
- [Axios](https://axios-http.com/) — HTTP-клиент
- [React Hook Form](https://react-hook-form.com/) — формы и валидация

**Интернационализация**
- [i18next](https://www.i18next.com/) — интернационализация

**Тестирование**
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) — юнит и интеграционные тесты
- [MSW](https://mswjs.io/) — мокирование API в тестах
- [Playwright](https://playwright.dev/) — E2E-тесты и визуальное регрессионное тестирование

---

## Архитектура: [Feature-Sliced Design](https://feature-sliced.design/)

Слои расположены от нижних к верхним — верхние импортируют из нижних, но не наоборот.

| Слой        | Назначение                                             |
|-------------|--------------------------------------------------------|
| `shared/`   | Утилиты, хуки, типы, локали, тест-хелперы              |
| `entities/` | Доменные модели: Redux-слайсы, типы, моки              |
| `features/` | Пользовательские сценарии: логика + UI                 |
| `widgets/`  | Композиции фич и сущностей для переиспользуемых секций |
| `pages/`    | Полноэкранные представления из виджетов                |
| `app/`      | Точка входа, провайдеры, Redux store, роутер           |

---

## SSR и роутинг

Приложение использует React Router v7 в framework mode с серверным рендерингом (SSR).

Маршруты имеют языковой префикс: `/ru/gallery`, `/en/profile`. Язык определяется автоматически из URL или заголовка `Accept-Language`. Корневой маршрут `/` перенаправляет на языковую версию.

Файлы `robots.txt` и `sitemap.xml` генерируются автоматически как ресурсные маршруты React Router и включают `hreflang`-ссылки для всех языковых версий.

---

## E2E-тесты

Команда `npm run test:e2e` на Windows не запускает тесты браузерного движка webkit, так как он работает нестабильно.
Чтобы запустить тесты используя движок webkit, необходимо установить дистрибутив Linux с `rsync` и Node.js через WSL и
использовать команду `npm run test:e2e:webkit` или `npm run test:e2e:webkit:update` для обновления скриншотов.

---

## Docker

Проект использует многоэтапный Dockerfile:

- **Base** — установка зависимостей Node.js
- **Build** — сборка проекта через Vite
- **Run** — SSR-сервер на Node.js

---

## Ссылки

- [VibeArt](https://github.com/Bitsulov/VibeArt) — основной репозиторий
- [VibeArt API](https://github.com/Bitsulov/vibeart-service-api) — основной сервис API
- [VibeArt email service](https://github.com/Bitsulov/vibeart-service-email) — сервис отправки электронных писем
