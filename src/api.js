import axios from 'axios';

const API = axios.create({
  // baseURL: "https://planner-backend-ggqe7.ondigitalocean.app"
  baseURL: "http://localhost:8080"
});

export default API;