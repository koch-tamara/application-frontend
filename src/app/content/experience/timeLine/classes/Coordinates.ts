
export class Coordinates {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public distanceToY(y: number): number {
        return Math.abs(this.y - y);
    }
}