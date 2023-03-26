import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Product from "./components/Product";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/cartContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
