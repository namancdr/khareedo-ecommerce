import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const { title, description, image, price, category } = product;

  const isProductAdded = cartItems.find((i) => i.id === product.id);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity
    };

    addToCart(cartItem)
  };

  const ProductElement = (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4 product-image-container text-center">
          <img src={product.image} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-8 p-4">
          <h2>{product.title}</h2>
          <strong className="text-muted mt-4">{product.category}</strong>
          <p className="h6 mt-4">{product.description}</p>
          <h1 className="mt-4">${product?.price}</h1>
          <div className="d-flex align-items-center mb-3 mt-3">
            <strong className="me-3">Quantity:</strong>
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="btn btn-outline-secondary btn-sm ms-2"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-lg btn-primary"
            onClick={handleAddToCart}
          >
            {isProductAdded ? "Item added to cart" : "Add to cart"}
          </button>
          {isProductAdded ?<Link to='/cart'><p className="mt-3">Go to cart..</p></Link> : null}
        </div>
      </div>
    </div>
  );

  return product.title ? (
    ProductElement
  ) : (
    <h3 className="text-center mt-4">loading...</h3>
  );
};

export default Product;
