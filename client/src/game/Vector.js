export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    set len(v) {
        const f = v / this.len;
        this.x *= f;
        this.y *= f;
    }
}