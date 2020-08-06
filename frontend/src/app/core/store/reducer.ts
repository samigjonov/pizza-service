import { ActionsUnion, ActionTypes } from './actions';

export const initialState = {
  items: [],
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
};

export function ShopReducer(state = initialState, action: ActionsUnion) {
  let cart, itemIndex;
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      return {
        ...state,
        items: [...action.payload]
      };

    case ActionTypes.Add:
      cart = [...state.cart];
      itemIndex = cart.findIndex(cartItem => cartItem.item._id === action.payload._id);
      if (itemIndex > -1) {
        cart[itemIndex] = {
          item: cart[itemIndex].item,
          quantity: cart[itemIndex].quantity + 1
        };
      } else {
        cart.push({
          item: action.payload,
          quantity: 1
        })
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      return {
        ...state,
        cart: [...cart]
      };

    case ActionTypes.Remove:
      cart = [...state.cart];
      itemIndex = cart.findIndex(cartItem => cartItem.item._id === action.payload._id);
      let newQuantity = cart[itemIndex].quantity - 1;
      if (newQuantity === 0) {
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex] = {
          item: cart[itemIndex].item,
          quantity: cart[itemIndex].quantity - 1
        };
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      return {
        ...state,
        cart: [...cart]
      };

    case ActionTypes.RemoveItem:
      cart = [...state.cart];
      itemIndex = cart.findIndex(cartItem => cartItem.item._id === action.payload._id);
      cart.splice(itemIndex, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      return {
        ...state,
        cart: [...cart]
      };

    case ActionTypes.ClearCart:
      localStorage.removeItem('cart');
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
}
