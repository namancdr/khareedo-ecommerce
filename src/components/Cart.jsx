import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

const calculateTotal = (cartItems) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.quantity * item.price;
  });

  return total;
};

const Cart = () => {
  const { cartItems, setCartItems } = useCart();

  // calculate the total price of all products in the cart

  // remove a product from the cart
  const removeProduct = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  // update the quantity of a product in the cart
  const updateQuantity = (id, quantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  return (
    <div className="container mt-4">
      <h3>Cart</h3>
      {cartItems.length === 0 ? (
        <h4>Your cart is empty.</h4>
      ) : (
        <div>
          <div className="total container d-flex align-items-center p-2">
            <h5>Your total cart value is: ${calculateTotal(cartItems)}</h5>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className="mt-4">
              <div className="cart-item-info d-flex align-items-center">
                <div className="cart-img-container">
                  <img src={item.image} className="img-fluid" alt="" />
                </div>
                <div>
                  <h3>
                    <Link to={`/product/${item.id}`}>{item.title}</Link>
                  </h3>
                  <p>Price: ${item.price}</p>
                </div>
              </div>
              <p>
                Quantity:{" "}
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className={`btn btn-outline-secondary ${
                    item.quantity === 0 ? "disabled" : ""
                  }`}
                >
                  -
                </button>{" "}
                {item.quantity}{" "}
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="btn btn-outline-secondary"
                >
                  +
                </button>
              </p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeProduct(item.id)}
              >
                Remove from cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
