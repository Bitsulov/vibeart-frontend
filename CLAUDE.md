# CLAUDE.md

Руководство для Claude Code при работе с этим репозиторием.

## Команды

​```bash
# Разработка
npm run dev

# Сборка
npm run build

# Линтинг
npm run lint

# Юнит-тесты (Vitest)
npm run test          # watch-режим
npm run test:run      # однократный запуск
npm run test:coverage # покрытие (порог 70%)
npm run test:ui       # UI-дашборд

# E2E (Playwright)
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:debug
​```

Запуск одного файла:
​```bash
npx vitest run src/features/burgerButton/ui/burgerButton.test.tsx
​```

## Архитектура: Feature-Sliced Design (FSD)

Слои (нижние → верхние; верхние импортируют из нижних, не наоборот):

| Слой | Назначение |
|---|---|
| `shared/` | Утилиты, хуки, типы, локали, тест-хелперы |
| `entities/` | Доменные модели: Redux-слайсы, типы, моки |
| `features/` | Пользовательские сценарии: логика + UI |
| `widgets/` | Композиции фич/сущностей для переиспользуемых секций |
| `pages/` | Полноэкранные вью из виджетов |
| `app/` | Точка входа, провайдеры, Redux store |

Алиасы (`vite.config.ts` и `tsconfig.app.json`):
`@`, `shared`, `entities`, `features`, `widgets`, `pages`, `processes`, `app` → `src/<layer>/`

Импортировать только через `index.ts` слайса, без глубоких импортов.

## Стейт

Redux Toolkit, три слайса в `src/app/store/rootReducer.ts`:
- `user` — авторизация и профиль (`entities/user/model/userSlice.ts`)
- `app` — конфиг, язык (`entities/appConfig/model/appSlice.ts`)
- `hint` — состояние подсказок

`setUserInfo(Partial<UserType>)` — мёрджит только переданные поля.

TanStack Query — для серверных данных, Redux — для клиентского/UI-стейта.

## Роутинг

React Router v7. Маршруты в `src/app/providers/routerProvider/ui/routerProvider.tsx`. Динамические сегменты на ULID (`/profile/:ulid`, `/post/:ulid`).

## Тесты

Vitest + Testing Library + MSW + Playwright. Хелперы в `src/shared/tests/`:

- `renderWithProviders(ui, options?)` — оборачивает в Redux store, i18n, MemoryRouter. Принимает `preloadedState` и `route`.
- `mswServer` — экземпляр MSW; хендлеры в `src/shared/tests/handlers/index.ts`.
- `i18n` (тестовый) — возвращает ключи как есть, без перевода.

Vitest globals включены — `describe`, `it`, `expect` импортировать не нужно. Setup: `src/shared/tests/setup.ts`.

`data-testid` не добавлять в продакшн-компоненты; оборачивать в тестах при необходимости.

Playwright тесты и настройки в `/e2e/`

## i18n

i18next + LanguageDetector. Локали в `src/shared/locales/` (`ru.json` и др.).

## Дополнения

- Только SCSS Modules, глобальные стили только в `index.scss`
- Если нужно добавить стиль общего контейнера на странице, то это глобальный класс `.container`
- Для нетривиального компонента писать тест, затем запускать `npm run lint` и `npm run test:run`
- Для playwright тестов запускать `npm run test:e2e`
- Запрещено коммитить и пушить в main ветку, gitflow: образец названия ветки: feature/<НАЗВАНИЕ ВЕТКИ>
- Названия тестов: <НАЗВАНИЕ ФАЙЛА>.test.ts(tsx), тесты (кроме e2e) создаются рядом с файлами, которые тестируется и названия такие же, как у них
- В тестах предпочтительно не использовать expect.anything();
- Не пиши слишком много бессмысленных тестов, если компонент или функция относительно простые, пиши имеющие смысл тесты
- В конце файлов добавляй пустую строку, если отсутствует, в том числе и в новых файлах
- При верстке всегда делать mobile-first, и всегда как можно более SEO-friendly, старайся делать меньше media-запросов, больше clamp
- Всегда для строк использовать кавычки: " или `, если нужно подставить переменную
- В коммите в названии максимум 50 символов, с маленькой буквы, в описании коммита на строке максимум 72 символа
- Решай сам, когда описание коммита нужно, а когда нет
- `npm version patch`, `npm version minor` или `npm version major` для обновления версии
