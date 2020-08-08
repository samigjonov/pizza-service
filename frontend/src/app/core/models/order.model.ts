import { Pizza } from "./pizza.model";

export interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  items: [{ item: Pizza, quantity: number }];
  totalPrice: {
    usd: number,
    eur: number
  };
  createdAt: Date | string;
}
