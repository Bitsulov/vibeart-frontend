AGENTS.md

Руководство для AI при работе с этим репозиторием.

## Команды

```bash
# Разработка
npm run dev

# Сборка
npm run build

# Проверка типов
npm run typecheck

# Линтинг
npm run lint

# Юнит-тесты (Vitest)
npm run test          # watch-режим
npm run test:run      # однократный запуск
npm run test:coverage # покрытие (порог 75%)
npm run test:ui       # UI-дашборд
npm run test:all      # lint + typecheck + vitest + playwright (финальная проверка)

# E2E (Playwright)
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:debug
```

Запуск одного файла:
```bash
npx vitest run src/features/burgerButton/ui/burgerButton.test.tsx
```

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

## SSR и роутинг

React Router v7 в framework mode с серверным рендерингом (SSR).

Ключевые файлы:
- `react-router.config.ts` — конфигурация React Router, директория приложения и SSR
- `src/app/router/root.tsx` — корневой маршрут: загрузчик языка, провайдеры
- `src/app/router/layout.tsx` — HTML-оболочка: `<head>`, мета-теги, SEO
- `src/app/router/routes.ts` — дерево маршрутов
- `src/app/router/routes/` — файлы маршрутов (ре-экспорты страниц + ресурсные маршруты)

Динамические сегменты используют UUID (`/profile/:uuid`, `/post/:uuid`).

SSR отключается во время Playwright-тестов через `PLAYWRIGHT=1`.

## Язык в URL

Маршруты имеют языковой префикс: `/ru/gallery`, `/en/profile`.

- Язык определяется на сервере через `detectLanguageFromRequest` (путь → заголовок Accept-Language → `"en"`)
- `InitProvider` синхронизирует язык URL с Redux и i18next на клиенте
- Корневой маршрут `/` перенаправляет на `/{lang}/`
- `robots.txt` и `sitemap.xml` генерируются автоматически как ресурсные маршруты

## Стейт

Redux Toolkit, три слайса в `src/app/store/rootReducer.ts`:
- `user` — авторизация и профиль (`entities/user/model/userSlice.ts`)
- `app` — конфиг, язык (`entities/appConfig/model/appSlice.ts`)
- `hint` — состояние подсказок

`setUserInfo(Partial<UserType>)` — мёрджит только переданные поля.

TanStack Query — для серверных данных, Redux — для клиентского/UI-стейта.
`QueryProvider` (`src/app/providers/queryProvider`) оборачивает приложение в `QueryClientProvider`.

## API и авторизация

- `src/shared/api/instance.ts` — общий axios-инстанс `api` с базовым URL из `VITE_API_BASE`. Перехватчик запросов подставляет заголовок `Authorization` из `accessToken` в cookies, а при его отсутствии обновляет токены через `/auth/refresh`
- `src/shared/lib/crypto.ts` — `encryptToString`/`decryptFromString`, AES-GCM шифрование токенов перед сохранением в cookies (ключ — `VITE_CRYPTO_KEY`)
- `src/shared/lib/clearCookiesTokens.ts` — удаляет cookies токенов авторизации
- `src/shared/const/const.ts` — `refreshIgnoreEndpoints`, эндпоинты, для которых перехватчик не подставляет и не обновляет токен
- `entities/user/api/userApi.ts` — `register`, `sendCode`, `verify`, `login`, `refresh`, `getPrincipalUser`

## Тесты

Vitest + Testing Library + MSW + Playwright. Хелперы в `src/shared/tests/`:

- `renderWithProviders(ui, options?)` — оборачивает в Redux store, i18n, MemoryRouter. Принимает `preloadedState` и `route`.
- `mswServer` — экземпляр MSW; хендлеры в `src/shared/tests/handlers/index.ts`.
- `i18n` (тестовый) — возвращает ключи как есть, без перевода.

Не менять компоненты ради фикса тестов.

Playwright тесты и настройки в `/e2e/`.

## i18n

i18next. Локали в `src/shared/locales/` (`ru.json`, `en.json`). Язык определяется из URL-префикса.

## Дополнения

- Только SCSS Modules, глобальные стили только в `src/app/index.scss`
- Если нужно добавить стиль общего контейнера на странице, то это глобальный класс `.container`
- Для нетривиального компонента писать тест, затем запускать `npm run lint` и `npm run test:run`
- Для playwright тестов запускать `npm run test:e2e`
- Запрещено коммитить и пушить в main ветку, github flow: образец названия ветки: feature/<НАЗВАНИЕ ВЕТКИ>
- Названия тестов: <НАЗВАНИЕ ФАЙЛА>.test.ts(tsx), тесты (кроме e2e) создаются рядом с файлами, которые тестируется и названия такие же, как у них
- В тестах предпочтительно не использовать expect.anything()
- Не пиши слишком много бессмысленных тестов, если компонент или функция относительно простые, пиши имеющие смысл тесты
- В конце файлов добавляй пустую строку, если отсутствует, в том числе и в новых файлах
- При верстке всегда делать mobile-first, и всегда как можно более SEO-friendly, старайся делать меньше media-запросов, больше clamp, использовать rem
- Всегда для строк использовать кавычки: " или `, если нужно подставить переменную
- В коммите в названии максимум 50 символов, с маленькой буквы, в описании коммита на строке максимум 72 символа
- Решай сам, когда описание коммита нужно, а когда нет
- Описание коммита: каждое отдельное изменение — отдельный абзац с пустой строкой между ними
- Глаголы — в повелительном наклонении без окончания: `add`, `remove`, `replace`, не `added`/`adds`
- Аббревиатуры пишутся заглавными буквами: SSR, API, URL, SEO и т.д.
- Каждый абзац — одно предложение: действие + для чего оно сделано (например, `to fix ...`)
- Не описывай, что делал старый/баганый код — только то, что сделано и зачем
- `npm version patch`, `npm version minor` или `npm version major` для обновления версии
- Перед созданием ветки и коммитами запусти `npm run test:all`, если все успешно, то продолжай
- Выноси логику из компонентов: хуки, обработчики, функции в model, lib и др. Если они применимы к любым компонентом, то выноси в shared
- При пуше убедись, что все нужное закоммичено
- Название коммитов всегда начинается с какого-то действия
- Перед коммитом проверять staged, нет ли лишних файлов
- Пиши полную документацию
