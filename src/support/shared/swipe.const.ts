export const SWIPE_DIRECTION = {
    down: {
        start: { x: 50, y: 15 },
        end: { x: 50, y: 85 },
    },
    left: {
        start: { x: 95, y: 50 },
        end: { x: 5, y: 50 },
    },
    right: {
        start: { x: 5, y: 50 },
        end: { x: 95, y: 50 },
    },
    up: {
        start: { x: 50, y: 85 },
        end: { x: 95, y: 15 },
    },
};
export interface XY {
    x: number;
    y: number;
}
export interface RectReturn {
    x: number;
    y: number;
    width: number;
    height: number;
}