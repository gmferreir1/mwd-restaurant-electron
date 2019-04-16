
const registerProduct = async ({ commit }, productData) => {
  await commit("SET_PRODUCT_SALE", productData);
};

const addNewProducts = ({ commit }, products) => {
  commit("ADD_NEW_PRODUCTS", products);
}

const cleanProducts = ({ commit }) => {
  commit("CLEAN_PRODUCTS");
}

export default {
  registerProduct,
  addNewProducts,
  cleanProducts
};
