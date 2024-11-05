import { OrderStatusEnum } from "@prisma/client";
import { IProduct } from "./product.dto";
import { CategoryDTO } from "./category.dto";

export interface OrderDTO {
  status?: OrderStatusEnum;
  orderItem: OrderItemDTO[];
  totalPrice: number;
}

export interface OrderItemDTO {
  productId: number;
  product: IProduct;
  orderId: number;
  quantity: number;
}
