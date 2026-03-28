export function getShortNumber(number: number, fractionDigits = 1) {
    return new Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: fractionDigits
    }).format(number);
}
