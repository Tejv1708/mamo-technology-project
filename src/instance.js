import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://calender-teju-backend.onrender.com/api',
  // baseURL: 'http://localhost:3000/api/',
  // baseURL: 'https://mamo-technology-project-backend.onrender.com/api/',
});
