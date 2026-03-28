export function getRangeNumbers(current: number, total: number, delta: number = 2) {
    let start = current - delta;
    let end = current + delta;

    if (start < 1) {
        start = 1;
        end = Math.min(delta * 2 + 1, total);
    }

    if (end > total) {
        end = total;
        start = Math.max(total - delta * 2, 1);
    }

    return { start, end };
}
