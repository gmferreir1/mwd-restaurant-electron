const SET_PRODUCT_SALE = (state, product) => {
  state.products_sale.push(product);
}

const ADD_NEW_PRODUCTS = (state, products) => {
  state.products_sale = products;
}

const CLEAN_PRODUCTS = (state) => {
  state.products_sale = [];
}


export default {
  SET_PRODUCT_SALE,
  ADD_NEW_PRODUCTS,
  CLEAN_PRODUCTS
};