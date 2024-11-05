import { CategoryDTO } from "./category.dto";

export interface CreateProductDTO {
  productName: string;
  description: string;
  price: number;
  quantity: number;
  userId: number;
  categoryId: number;
  productImage?: ProductImage[];
}

export interface UpdateProductDTO {
  productName: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  productImage?: ProductImage[];
}

export interface ProductImage {
  url: string;
}

export interface IProduct {
  productName: string;
  description: string;
  price: number;
  quantity: number;
  userId: number;
  category: CategoryDTO;
  productImage?: ProductImage[];
}
