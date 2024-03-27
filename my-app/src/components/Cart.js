import React, { useState } from "react";
import "./Cart.css";

const Product = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 },
];

export function Products({ cart, addtocart, removeToCart }) {
  return (
    <div className="right">
      <h1>Products</h1>;
      {Product.map((item, index) => {
        const cartItem = cart.find((cartItem) => cartItem.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        return (
          <ul>
            <li key={index}>
              <span>{item.name}</span>
              <span>{item.price}</span>
              <span>
                <button onClick={() => removeToCart(item)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => addtocart(item)}>+</button>
              </span>
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export function AddedProducts({ cart }) {
  let total = 0;
  if (cart.length === 0) {
    return <p className="left">Cart is Empty</p>;
  } else {
    return (
      <div className="left">
        <h1>Cart</h1>
        {cart.map((item, index) => {
          total += item.price * item.quantity;
          return (
            <ul>
              <li key={index}>
                {item.name}{" "}
                <span>
                  {" "}
                  {item.price} x {item.quantity}{" "}
                </span>{" "}
                Total = {item.price * item.quantity}
              </li>
            </ul>
          );
        })}
        <h3>Total: {total}</h3>
      </div>
    );
  }
}

function Cart() {
  const [cart, setCart] = useState([]);
  function addtocart(product) {
    const itemIndex = cart.findIndex((i) => i.id === product.id);
    if (itemIndex === -1) setCart([...cart, { ...product, quantity: 1 }]);
    else {
      const updatedCart = cart.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    }
  }

  function removeToCart(product) {
    let itemIndex = cart.findIndex((i) => i.id === product.id);
    if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
      const updatedCart = cart.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart(cart.filter((e) => e.id !== product.id));
    }
  }
  return (
    <div className="container">
      <Products
        cart={cart}
        addtocart={addtocart}
        removeToCart={removeToCart}
      ></Products>
      <AddedProducts cart={cart}></AddedProducts>
    </div>
  );
}

export default Cart;
