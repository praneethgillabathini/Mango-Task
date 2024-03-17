import React from "react";
import { productId, inCart } from "../utils";

function ProductCard(props) {
  const { product, idx, cart, setCart, curPage, productsPerPage } = props;

  const addToCart = (product, idx) => {
    const id = productId(curPage, idx, productsPerPage);

    const newProduct = {
      id,
      quantity: 1,
      ...product,
    };
    const newCart = [...cart, newProduct];

    setCart(newCart);
  };

  const removeFromCart = (idx) => {
    const id = productId(curPage, idx, productsPerPage);

    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
  };

  return (
    <div className="product">
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.name} />

      <div className="product-footer">
        <span>${product.price}</span>
        {inCart(cart, productId(curPage, idx, productsPerPage)) ? (
          <button
            onClick={() => removeFromCart(idx)}
            style={{
              backgroundColor: "rgb(255, 86, 34)",
              color: "white",
            }}
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => addToCart(product, idx)}
            style={{ backgroundColor: "orange" }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
