
export class RandomNumberInRange {
    min: number;
    max: number;
    randomIntInRange: number;

    constructor(number1: number, number2: number) {
        this.min = number1 < number2 ? number1 : number2;
        this.max = number1 < number2 ? number2 : number1;
        this.randomIntInRange = this.randomInt(this.min, this.max);
    }

    private randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}