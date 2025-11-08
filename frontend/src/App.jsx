import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import "./index.css";

export default function App() {
  return (
    <div>
      <nav className="navbar">
        <h1 id="brandid">VIBE COMMERCE</h1>
      </nav>

      <div className="container">
        <Products />
        <Cart />
      </div>

      <div className="checkoutBox">
        <Checkout />
      </div>
    </div>
  );
}
