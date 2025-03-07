/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface InitialState {
    products:any,
    shopId: string;
  }
  
  const initialState: InitialState = {
    products: [],
    shopId:""
  };
  


export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addProduct: (state, action) => {
            if (state.products.length === 0) {
              state.shopId = action.payload._id;
            }
      
            const productToAdd = state.products.find(
              (product:any) => product._id === action.payload._id
            );
      
            if (productToAdd) {
              productToAdd.orderQuantity += 1;
              return;
            }
      
            state.products.push({ ...action.payload, orderQuantity: 1 });
          },
          incrementOrderQuantity: (state, action) => {
            const productToIncrement = state.products.find(
              (product:any) => product._id === action.payload
            );
      
            if (productToIncrement) {
              productToIncrement.orderQuantity += 1;
              return;
            }
          },
          decrementOrderQuantity: (state, action) => {
            const productToIncrement = state.products.find(
              (product:any) => product._id === action.payload
            );
      
            if (productToIncrement && productToIncrement.orderQuantity > 1) {
              productToIncrement.orderQuantity -= 1;
              return;
            }
          },
          removeProduct: (state, action) => {
            state.products = state.products.filter(
              (product:any) => product._id !== action.payload
            );
          },
          clearCart: (state) => {
            state.products = [];
          },
        },
    })


    export const orderedProductsSelector = (state: RootState) => {
        return state.cart.products;
      };
    
      export const shopSelector = (state: RootState) => {
        return state.cart.shopId;
      };

      export const subTotalSelector = (state: RootState) => {
        return state.cart.products.reduce((acc:any, product:any) => {
          if (product.offerPrice) {
            return acc + product.offerPrice * product.orderQuantity;
          } else {
            return acc + product.price * product.orderQuantity;
          }
        }, 0);
      };

      export const {
        addProduct,
        incrementOrderQuantity,
        decrementOrderQuantity,
        removeProduct,
        clearCart,
      } = cartSlice.actions;
      export default cartSlice.reducer;
      
      
