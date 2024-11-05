export class Balance {
    id: number;
    slug: string;
    sum: number;

    constructor(id: number, slug: string, sum: number) {
        this.id = id;
        this.slug = slug;
        this.sum = sum;
    }
}
