const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const signupUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

export const fetchCart = async () => {
  const res = await fetch(`${API_URL}/cart`, { headers: getAuthHeader() });
  return res.json();
};

export const addItemToCart = async (item) => {
  const res = await fetch(`${API_URL}/cart/add`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(item),
  });
  return res.json();
};

export const removeItemFromCart = async (productId) => {
  const res = await fetch(`${API_URL}/cart/remove`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ productId }),
  });
  return res.json();
};