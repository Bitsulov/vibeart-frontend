import type {MasonryProps} from "react-masonry-css";

/** Конфигурация точек останова для списка постов галереи. (Masonry) */
export const masonryBreakpointsConfig: MasonryProps["breakpointCols"] = {
    default: 3,
    1830: 2,
    1200: 3,
    860: 2,
    570: 1,
}
