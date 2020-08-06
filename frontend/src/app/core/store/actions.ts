import { Action } from '@ngrx/store';
import { Pizza } from "../models/pizza.model";

export enum ActionTypes {
  Add = '[Pizza] Add to cart',
  Remove = '[Pizza] Remove from cart',
  LoadItems = '[Pizza] Load items from server',
  LoadSuccess = '[Pizza] Load success',
  ClearCart = '[Pizza] Clear Cart',
  RemoveItem = '[Pizza] Remove item from cart'
}

export class AddToCart implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: Pizza) {
  }
}

export class GetItems implements Action {
  readonly type = ActionTypes.LoadItems;
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


export class RemoveItem implements Action {
  readonly type = ActionTypes.RemoveItem;

  constructor(public payload: Pizza) {
  }
}


export class ClearCart implements Action {
  readonly type = ActionTypes.ClearCart;
}

export type ActionsUnion = AddToCart | RemoveFromCart | LoadItems | GetItems | ClearCart | RemoveItem;
