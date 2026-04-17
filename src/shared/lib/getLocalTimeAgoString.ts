import i18n from 'i18next';

/**
 * Возвращает относительную строку времени (например, «2 часа назад»).
 * Использует `Intl.RelativeTimeFormat` для локализации.
 *
 * @param language - Код языка (например, `"ru"`, `"en"`).
 * @param date - Дата для вычисления разницы с текущим моментом.
 * @returns Локализованная строка относительного времени.
 */
export function getLocalTimeAgoString(language: string, date: Date | string) {
    const rtf = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });
    const diff = (new Date(date).getTime() - Date.now()) / 1000;

    const units: { unit: Intl.RelativeTimeFormatUnit; sec: number }[] = [
        { unit: 'year',   sec: 31536000 },
        { unit: 'month',  sec: 2592000  },
        { unit: 'week',   sec: 604800   },
        { unit: 'day',    sec: 86400    },
        { unit: 'hour',   sec: 3600     },
        { unit: 'minute', sec: 60       },
        { unit: 'second', sec: 1        },
    ];

    for(const { unit, sec } of units) {
        if(Math.abs(diff) >= sec) {
            return rtf.format(Math.round(diff / sec), unit);
        }
    }

    return i18n.t("justNow");
}
