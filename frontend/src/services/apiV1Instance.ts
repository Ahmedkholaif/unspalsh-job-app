
import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
  baseURL: `${config.backendUrl}/api/v1`,
});

export default axiosInstance;