export type ProductID = string;
export type Url = string;

export interface Product {
  _id: ProductID;
  category: string;
  description: string;
  image: Url;
  name: string;
  price: number;
  quantity: number;
  seller_id: string;
}

export interface BasketProduct extends Product {
  basket_name: string
}
