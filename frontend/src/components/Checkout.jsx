import { checkout } from "../api";

export default function Checkout() {
  const handle = async () => {
    const r = await checkout();
    alert(`Order Successful!\nTotal: ₹${r.data.total}`);
  };

  return <button className="checkoutBtn" onClick={handle}>Proceed to Checkout</button>;
}
