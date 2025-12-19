export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  images?: string[];
  brand?: string;
  category?: string;
  stock?: number;
}
