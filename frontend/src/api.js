import axios from "axios";
const API = "http://localhost:5000/api";
export const getProducts = () => axios.get(`${API}/products`);
export const addToCart = (data) => axios.post(`${API}/cart`, data);
export const getCart = () => axios.get(`${API}/cart`);
export const removeItem = (id) => axios.delete(`${API}/cart/${id}`);
export const checkout = () => axios.post(`${API}/checkout`);
export const updateCartQty = (id, qty) => {
  return axios.put(`${API}/cart/${id}`, { qty });
};
