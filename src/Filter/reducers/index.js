import { FILTER_PRODUCTS } from "../constants";
import {Products} from '../../Product/Products'


export const filtered_products = (filteredProducts = Products, action) => {
  if (action.type === FILTER_PRODUCTS) {
    return (filteredProducts = action.payload);
  }

  return filteredProducts;
};