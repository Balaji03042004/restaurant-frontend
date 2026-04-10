import axios from "axios";

const BASE_URL = "http://localhost:8080/api/restaurants";

export const getRestaurants = () => {
  return axios.get(BASE_URL);
};

export const addRestaurant = (restaurant) => {
  return axios.post(BASE_URL, restaurant);
};