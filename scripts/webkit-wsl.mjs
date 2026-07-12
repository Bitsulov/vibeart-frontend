#!/usr/bin/env node
/**
 * @file Скрипт для запуска e2e-тестов Playwright (WebKit) на Linux, MacOs или WSL.
 *
 * Нативный WebKit в Playwright нестабилен под Windows. На Linux и MacOS
 * `playwright test` запускается напрямую. На Windows директория проекта, включая
 * незакоммиченные изменения, синхронизируется через rsync в копию под WSL,
 * и тесты запускаются уже оттуда.
 *
 * Зависимости и браузеры в WSL переустанавливаются только при изменении
 * `package-lock.json`. Тесты запускаются на отдельном порту, чтобы не
 * конфликтовать с dev-сервером на стороне Windows. HTML-отчёт копируется
 * обратно в `playwright-report-wsl`. Новые и обновлённые baseline-
 * скриншоты копируются обратно в соответствующие каталоги `e2e/*-snapshots`
 * в директории проекта на Windows.
 */

import { spawnSync } from "node:child_process";
import { basename } from "node:path";

const WSL_DISTRO = "Ubuntu";
const WEBKIT_PROJECTS = ["Desktop Webkit", "Mobile Webkit"];
const WSL_DEV_SERVER_PORT = "5174";

/** Каталоги, исключаемые из синхронизации rsync между Windows и WSL. */
const RSYNC_EXCLUDES = [
    "node_modules",
    ".git",
    "build",
    "dist",
    "dist-ssr",
    "coverage",
    ".react-router",
    "test-results",
    "playwright-report",
    "playwright-report-wsl",
    ".deps-stamp"
];

// Аргументы, переданные после `--`, передаются в `playwright test`.
const extraArgs = process.argv.slice(2);

const pwArgs = [
    "playwright",
    "test",
    ...WEBKIT_PROJECTS.flatMap(p => ["--project", p]),
    ...extraArgs
];

if (process.platform === "linux" || process.platform === "darwin") {
    const r = spawnSync("npx", pwArgs, { stdio: "inherit" });
    process.exit(r.status ?? 1);
}

if (process.platform !== "win32") {
    console.error(
        `Unsupported platform: ${process.platform}. The script only supports Windows, Linux and MacOS.`
    );
    process.exit(1);
}

// Дальнейший код выполняется только на Windows.

/** Экранирует строку для безопасной подстановки в одинарные кавычки bash (' → '\''). */
const shq = s => `'${String(s).replace(/'/g, `'\\''`)}'`;

const cwd = process.cwd();
const projectName = basename(cwd);

// Аргументы playwright экранируются, так как могут содержать пробелы и кавычки.
const pwArgsQuoted = pwArgs.map(shq).join(" ");
const rsyncExcludesArgs = RSYNC_EXCLUDES.map(dir => `--exclude ${shq(dir)}`).join(" ");

const bashScript = `
set -euo pipefail

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

command -v rsync >/dev/null || {
  echo "rsync not found in WSL. Install it: sudo apt install rsync" >&2
  exit 1
}
command -v node >/dev/null || {
  echo "node not found in WSL. Install nvm + Node LTS in the ${WSL_DISTRO} distro." >&2
  exit 1
}

SRC="$(wslpath -a ${shq(cwd)})"
DEST="$HOME/.cache/pw-webkit/${projectName}"
mkdir -p "$DEST"

echo "→ Syncing project directory (including uncommitted changes)..."
rsync -a --delete ${rsyncExcludesArgs} "$SRC/" "$DEST/"

cd "$DEST"

# Зависимости и браузеры переустанавливаются только при изменении lockfile.
HASH=$(sha256sum package-lock.json | cut -d' ' -f1)
if [ ! -f .deps-stamp ] || [ "$(cat .deps-stamp)" != "$HASH" ]; then
  echo "→ package-lock.json changed: running npm ci and installing browsers..."
  npm ci
  # Chromium требуется setup-проекту для авторизации; отдельный браузер для него не задан.
  npx playwright install webkit chromium
  echo "$HASH" > .deps-stamp
fi

echo "→ Running WebKit tests on port ${WSL_DEV_SERVER_PORT}..."
CODE=0
PORT=${WSL_DEV_SERVER_PORT} npx ${pwArgsQuoted} || CODE=$?

# HTML-отчёт копируется обратно на сторону Windows; отсутствие отчёта
# не считается ошибкой скрипта.
if [ -d playwright-report ]; then
  rsync -a --delete playwright-report/ "$SRC/playwright-report-wsl/" || true
  echo "→ Report saved to playwright-report-wsl/ (npx playwright show-report playwright-report-wsl)"
fi

# Baseline-скриншоты (включая новые и обновлённые *-linux.png для WebKit)
# копируются обратно в директорию проекта на Windows; снимки других браузеров не затрагиваются.
find e2e -type d -name "*-snapshots" | while read -r dir; do
  mkdir -p "$SRC/$dir"
  rsync -a "$dir/" "$SRC/$dir/"
done

exit $CODE
`;

const r = spawnSync("wsl.exe", ["-d", WSL_DISTRO, "-e", "bash", "-lc", bashScript], {
    stdio: "inherit"
});

if (r.error) {
    console.error("Failed to run wsl.exe.");
    console.error(String(r.error));
    process.exit(1);
}

process.exit(r.status ?? 1);
