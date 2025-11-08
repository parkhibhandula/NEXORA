import { useEffect, useState } from "react";
import { getCart, removeItem, updateCartQty } from "../api";

export default function Cart() {
  const [c, setC] = useState([]);
  const [total, setTotal] = useState(0);

  const load = async () => {
    const r = await getCart();
    setC(r.data.cart);
    setTotal(r.data.total);
  };

  useEffect(() => {
    load();
  }, [c]);

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    await updateCartQty(id, qty);
    load();  
  };

  return (
    <div className="cartCard">
      <h2>Your Cart</h2>

      {c.length === 0 && <p>Cart is empty</p>}

      {c.map((i) => (
        <div className="cartRow" key={i._id}>
          <span>{i.name} - ₹{i.price}</span>

          <div>
            <button onClick={() => updateQty(i._id, i.qty - 1)}>➖</button>
            <span style={{margin:"0 8px"}}>{i.qty}</span>
            <button onClick={() => updateQty(i._id, i.qty + 1)}>➕</button>

            <button onClick={() => removeItem(i._id).then(load)}>❌</button>
          </div>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}
