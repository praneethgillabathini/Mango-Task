// Calculate productId based on curPage (index of the product in the array)
export const productId = (curPage, idx, productsPerPage) => {
  return (curPage - 1) * productsPerPage + idx;
};

export const inCart = (cart, productId) => {
  return cart.filter((product) => product.id === productId).length > 0;
};
