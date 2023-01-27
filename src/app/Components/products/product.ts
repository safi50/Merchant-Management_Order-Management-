export interface Product {
    name: string;
    price: number;
    description: string;
    image: string;
    type: string;
    id: string;
}

export interface Category {
    name: string;
    id: string;
    products: Product[];
}