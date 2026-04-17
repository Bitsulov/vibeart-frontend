/**
 * Форматирует большое число в компактную нотацию (например, 1500 → «1.5K»).
 *
 * @param number - Число для форматирования.
 * @param fractionDigits - Максимальное количество знаков после запятой.
 * @returns Компактная строка числа.
 */
export function getShortNumber(number: number, fractionDigits = 1) {
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: fractionDigits
    }).format(number);
}
