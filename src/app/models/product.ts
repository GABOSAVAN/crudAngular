export interface Product{
    category?: string;
    description?: string;
    id?: number;
    price?: number;
    image?: string;
    rating?:[
        count: number,
        rate: number
    ];
    title?: string;
}