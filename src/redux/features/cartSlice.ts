/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface InitialState {
  products: any;
  shopId: string;
  disabled: boolean;
  Discount: number;
}

const initialState: InitialState = {
  products: [],
  shopId: "",
  disabled: true,
  Discount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (state.products.length === 0) {
        state.shopId = action.payload._id;
      }

      const productToAdd = state.products.find(
        (product: any) => product._id === action.payload._id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }

      state.products.push({ ...action.payload, orderQuantity: 1 });
    },
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product: any) => product._id === action.payload
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product: any) => product._id === action.payload
      );

      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
        return;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product: any) => product._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.products = [];
      state.Discount=0;
      state.disabled=true
    },
    removeButton: (state) => {
      state.disabled = false;
    },
    setDiscount: (state, action) => {
      state.Discount = action.payload;
    },
  },
});

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const shopSelector = (state: RootState) => {
  return state.cart.shopId;
};

export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc: any, product: any) => {
    if (product.offerPrice) {
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const totalAfterDiscountSelector = (state: RootState) => {
  const subtotal = subTotalSelector(state);
  const discount = state.cart.Discount;

  return subtotal - (subtotal * discount) / 100;
}

export const disabledButton = (state: RootState) => {
  return state.cart.disabled;
};

export const discount = (state: RootState) => {
  return state.cart.Discount;
};

// export const afterCoupon = (state: RootState, coupon: number) => {
//   const subTotal = subTotalSelector(state);
// };

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  clearCart,
  removeButton,
   setDiscount
} = cartSlice.actions;
export default cartSlice.reducer;
