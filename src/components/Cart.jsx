import React from "react";
import { Link } from "react-router-dom";

function Cart(props) {
  const { cart, setCart } = props;

  const increaseQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCart(updatedCart);
  };

  const decreaseQuantity = (product) => {
    let updatedCart;

    if (product.quantity === 1) {
      updatedCart = cart.filter((item) => item.id !== product.id);
    } else {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    }

    setCart(updatedCart);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);

    setCart(updatedCart);
  };

  const getItemsCost = () => {
    let itemsCost = 0;

    cart.forEach((item) => {
      itemsCost += item.price * item.quantity;
    });

    return Math.round(itemsCost * 100) / 100;
  };

  const getGST = () => {
    return Math.round(getItemsCost() * 18) / 100;
  };

  return (
    <div className="App">
      <div className="header">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <Link to="/">Back</Link>
          <h2>Cart</h2>
        </div>
      </div>
      <div className="cart">
        {cart.length === 0 && <div className="empty-cart">Cart is empty</div>}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <span>
                  <img src={item.image} alt={item.name} />
                </span>
                <div>
                  <h4>{item.name}</h4>
                  <span>${item.price}</span>
                </div>
              </div>
              <div className="cart-edit">
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: "28%" }}>
          <div className="price-summary">
            <h4>Pricing Summary</h4>

            <div className="price">
              <div>Items Cost: </div>
              <span>${getItemsCost()}</span>
            </div>
            <div className="price">
              <div>GST: </div>
              <span>${getGST()}</span>
            </div>
            <div className="price">
              <span>Total: </span>
              <span>
                ${Math.round((getItemsCost() + getGST()) * 100) / 100}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
