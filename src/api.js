import axios from 'axios';

const API = axios.create({
  baseURL: "https://planner-backend-ggqe7.ondigitalocean.app"
});

export default API;