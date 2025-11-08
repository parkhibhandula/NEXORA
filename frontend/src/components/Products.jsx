import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";

export default function Products() {
  const [p, setP] = useState([]);

  useEffect(() => {
    getProducts().then((r) => setP(r.data));
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJlc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
  ];

  return (
    <div className="section">
      <h2>Our Products</h2>
      <div className="grid">
        {p.map((item, i) => (
          <div className="card" key={item._id}>
            <img src={images[i]} alt="product" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          <button onClick={async () => {
  await addToCart({ productId: item._id, qty: 1 });
  window.dispatchEvent(new Event("cartUpdated"));  // ✅ TRIGGER EVENT
}}>
  Add to Cart 🛒
</button>

          </div>
        ))}
      </div>
    </div>
  );
}
