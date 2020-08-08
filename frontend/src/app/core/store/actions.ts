import { Action } from '@ngrx/store';
import { Pizza } from "../models/pizza.model";

export enum ActionTypes {
  Add = 'Add to cart',
  Remove = 'Remove from cart',
  LoadItems = 'Load pizzas from server',
  LoadCurrency = 'Load currency from server',
  LoadSuccess = 'Load pizzas success',
  RateSuccess = 'Rate success',
  ClearCart = 'Clear Cart',
  RemoveItem = 'Remove item from cart'
}

export class AddToCart implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: Pizza) {
  }
}

export class GetItems implements Action {
  readonly type = ActionTypes.LoadItems;
}

export class GetCurrency implements Action {
  readonly type = ActionTypes.LoadCurrency;
}

export class RemoveFromCart implements Action {
  readonly type = ActionTypes.Remove;

  constructor(public payload: Pizza) {
  }
}

export class LoadItems implements Action {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public payload: Pizza[]) {
  }
}

export class LoadRate implements Action {
  readonly type = ActionTypes.RateSuccess;

  constructor(public payload: any) {
  }
}


export class RemoveItem implements Action {
  readonly type = ActionTypes.RemoveItem;

  constructor(public payload: Pizza) {
  }
}


export class ClearCart implements Action {
  readonly type = ActionTypes.ClearCart;
}

export type ActionsUnion =
  AddToCart
  | RemoveFromCart
  | LoadItems
  | GetItems
  | ClearCart
  | RemoveItem
  | LoadRate
  | GetCurrency;
