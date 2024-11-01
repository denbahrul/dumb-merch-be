export interface CreateProductDTO {
  productName: string;
  description: string;
  price: string;
  quantity: number;
  userId: number;
  categoryId: number;
  productImage?: ProductImage[];
}

export interface UpdateProductDTO {
  productName: string;
  description: string;
  price: string;
  quantity: number;
  categoryId: number;
  productImage?: ProductImage[];
}

export interface ProductImage {
  url: string;
}
