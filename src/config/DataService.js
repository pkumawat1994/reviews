import axios from "axios";
export const API_ENDPOINT = "https://e-shop-com.onrender.com";

const DataService = axios.create({
  baseURL: API_ENDPOINT,
 
});
export default DataService;
