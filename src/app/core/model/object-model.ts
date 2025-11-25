export class User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    mobNumber?: string;
    address?: string;
    uplodePhoto?: string;
    gender?: string;
    language?: string;
    dob?: string;
    agree?: boolean;
    age?: number;
    aboutUs?: string;
}
export class Address {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
}
export class Product {
    id?: number;
    name?: string;
    description?: string;
    uplodeImage?: string;
    price?: number;
    descount?: number;
    status?: boolean;
    category?: string;
    stock?: number;
    rating?: number;
}
export class Order {
    id?: number;
    userId?: number;
    sellarId?: number;
    productId?: Product;
    deliveryAddress?: Address;
    contactNumber?: number;
    orderDate?: string;
}