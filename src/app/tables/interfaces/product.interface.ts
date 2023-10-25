export interface ProductResponse {
  products: Product[],
  total: number,
  skip: number,
  limit: number
}

export interface Product {
  id: number,
  title: string,
  price: number
}

export interface ProductV2 {
  id: number;
  title: number;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingProps;
}

interface RatingProps {
  rate: number;
  count: number;
}