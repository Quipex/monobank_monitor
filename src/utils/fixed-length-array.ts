class FixedLengthArray<T> {
    private readonly length: number;
    private readonly items: T[];

    constructor(length: number) {
        this.length = length;
        this.items = [];
    }

    public add(item: T): void {
        if (this.items.length >= this.length) {
            this.items.shift(); // Remove the first added item
        }
        this.items.push(item);
    }

    public contains(item: T): boolean {
        return this.items.includes(item);
    }

    public get(): T[] {
        return this.items;
    }
}

export default FixedLengthArray;
