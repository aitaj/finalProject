import { FILTER_PRODUCTS } from "../constants";

export const filterProduct = (filteredProducts) => {
    
  return {
    type: FILTER_PRODUCTS,
    payload: filteredProducts,
  };
};