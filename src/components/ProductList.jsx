import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const truncatedText = (text) => {
    return text.substring(0, 100) + "...";
  };

  const productListElement = (
    <>
      <div className="container d-grid my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="container text-center d-flex flex-wrap justify-content-center">
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="card m-2"
              style={{ width: "18rem" }}
            >
              <Link className="link" to={`/product/${product.id}`}>
                <div className="product-list-img-container text-center p-4">
                  <img
                    src={product.image}
                    className="product-img card-img-top"
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <p className="text-muted">{product.category}</p>
                  <p>
                    rating : {product.rating.rate}({product.rating.count})
                  </p>
                  <h5 className="card-title">{truncatedText(product.title)}</h5>
                  <h2>${product.price}</h2>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );

  return filteredProducts ? (
    productListElement
  ) : (
    <h3 className="text-center mt-4">loading...</h3>
  );
};

export default ProductList;
