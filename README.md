# VibeArt — Frontend

Социальная сеть для творческих людей: публикация работ, альбомы, сообщества и обратная связь.

> Этот репозиторий является подмодулем основного репозитория [VibeArt](https://github.com/Bitsulov/VibeArt.git), который запускается через Docker Compose.

---

## Быстрый старт

### Режим разработки
```bash
npm install
npm run dev
```

### Режим предпросмотра
```bash
npm install
npm run preview
```
---

## Команды

| Команда                  | Описание                       |
|--------------------------|--------------------------------|
| `npm run dev`            | Запуск dev-сервера             |
| `npm run build`          | Сборка проекта                 |
| `npm run lint`           | Линтинг                        |
| `npm run test`           | Юнит-тесты в watch-режиме      |
| `npm run test:run`       | Однократный запуск юнит-тестов |
| `npm run test:coverage`  | Покрытие (порог 65%)           |
| `npm run test:ui`        | UI-дашборд Vitest              |
| `npm run test:e2e`       | E2E-тесты (Playwright)         |
| `npm run test:e2e:ui`    | UI-дашборд Playwright          |
| `npm run test:e2e:debug` | Отладка E2E-тестов             |

---

## Стек технологий

**Основное**
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — сборщик
- [SCSS Modules](https://sass-lang.com/) — стилизация

**Стейт и данные**
- [Redux Toolkit](https://redux-toolkit.js.org/) — клиентский стейт
- [TanStack Query](https://tanstack.com/query) — серверные данные
- [Axios](https://axios-http.com/) — HTTP-клиент
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — формы и валидация

**Интернационализация**
- [i18next](https://www.i18next.com/) — интернационализация (ru / en)

**Тестирование**
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) — юнит и интеграционные тесты
- [MSW](https://mswjs.io/) — мокирование API в тестах
- [Playwright](https://playwright.dev/) — E2E-тесты

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
| `app/`      | Точка входа, провайдеры, Redux store                   |

---

## Docker

Проект использует многоэтапный Dockerfile:

- **Dev** — Node.js с Hot Module Replacement
- **Prod** — оптимизированная сборка, раздаётся через Nginx

---

## Ссылки

- [VibeArt](https://github.com/Bitsulov/VibeArt.git) — основной репозиторий
- [VibeArt Backend](https://github.com/Bitsulov/vibeart-backend.git) — бэкенд
