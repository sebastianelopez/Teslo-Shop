import { ICartProduct } from "../../interfaces";
import { CartState, ShippingAddress } from "./";

type cartType =
  | {
      type: "[Cart] - Load Cart from cookies | storage";
      payload: ICartProduct[];
    }
  | {
      type: "[Cart] - Update products in cart";
      payload: ICartProduct[];
    }
  | {
      type: "[Cart] - Change cart product quantity";
      payload: ICartProduct;
    }
  | {
      type: "[Cart] - Remove cart product";
      payload: ICartProduct;
    }
  | {
      type: "[Cart] - Update order summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    }
  | {
      type: "[Cart] - Load Address from cookies";
      payload: ShippingAddress;
    }
  | {
      type: "[Cart] - Update Address";
      payload: ShippingAddress;
    };

export const cartReducer = (state: CartState, action: cartType): CartState => {
  switch (action.type) {
    case "[Cart] - Load Cart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case "[Cart] - Update products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Change cart product quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
          return action.payload; //valor actualizado
        }),
      };

    case "[Cart] - Remove cart product":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };

    case "[Cart] - Update order summary":
      return {
        ...state,
        ...action.payload,
      };
    
    case '[Cart] - Update Address':
    case "[Cart] - Load Address from cookies":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
