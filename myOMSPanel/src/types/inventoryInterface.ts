// Define an interface for product variants
interface ProductVariant {
    sku: string;
    name: string;
    price: number;
    special_price: number;
    image: string[];
    attributes: {
        color: string;
        size: string;
    };
}

// Define an interface for the main product
interface Product {
    sku: string;
    name: string;
    description: string;
    image: string;
    price: number;
    special_price: number;
    variants: ProductVariant[];
}