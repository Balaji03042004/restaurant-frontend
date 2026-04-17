import axios from "axios";

const BASE_URL = "http://localhost:8080/api/restaurants";

export const getRestaurants = () => {
  return axios.get(BASE_URL);
};

export const getRestaurantById = (id) => {
  return axios.get(`http://localhost:8080/api/restaurants/${id}`);
};
export const deleteRestaurant = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const updateRestaurant = (id, restaurant) => {
  return axios.put(`${BASE_URL}/${id}`, restaurant);
};

export const addRestaurant = (restaurant) => {
  return axios.post(BASE_URL, restaurant);
};