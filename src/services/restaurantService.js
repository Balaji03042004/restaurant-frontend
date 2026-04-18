import API from "./api";

// 🍽 GET ALL RESTAURANTS
export const getRestaurants = () => API.get("/api/restaurants");

// 🔍 GET RESTAURANT BY ID
export const getRestaurantById = (id) =>
  API.get(`/api/restaurants/${id}`);

// ➕ CREATE RESTAURANT
export const createRestaurant = (data) =>
  API.post("/api/restaurants", data);

// (OPTIONAL alias if you want)
export const addRestaurant = createRestaurant;

// ✏️ UPDATE
export const updateRestaurant = (id, data) =>
  API.put(`/api/restaurants/${id}`, data);

// ❌ DELETE
export const deleteRestaurant = (id) =>
  API.delete(`/api/restaurants/${id}`);

// ❤️ LIKE
export const updateRestaurantLike = (id, data) =>
  API.put(`/api/restaurants/${id}`, data);

// 🍔 MENU
export const getMenuByRestaurant = (restaurantId) =>
  API.get(`/api/menu/${restaurantId}`);