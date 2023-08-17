import axios from "axios";
export const API_ENDPOINT = "https://e-shop-com.onrender.com/reviews";

const dataService = axios.create({
  baseURL: API_ENDPOINT,
 
});
export default dataService;
