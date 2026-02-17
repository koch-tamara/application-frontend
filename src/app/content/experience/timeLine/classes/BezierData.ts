import { EBezierDirection } from "../enums/EBezierDirection";

export class BezierData {
    left?: EBezierDirection;
    right?: EBezierDirection;

    constructor(left?: EBezierDirection, right?: EBezierDirection) {
        this.left = left;
        this.right = right;
    }
}