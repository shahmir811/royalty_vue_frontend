import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: `${process.env.VUE_APP_BASE_URL}api/`,
	/* other custom settings */
});

export default axiosInstance;
