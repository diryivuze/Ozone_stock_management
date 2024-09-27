import axios from 'axios';
// Function to create Axios instance for public endpoints (publicToken)
export const publicAxios = () => {
  const instance = axios.create({
      baseURL: import.meta.env.VITE_MAIN_URL,
  });

  const publicToken = localStorage.getItem('Ozone_token'); // Get publicToken from local storage
  if (publicToken) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${publicToken}`;
  }

  return instance;
};