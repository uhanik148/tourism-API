import axios from 'axios';

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache',
};

export const instance = axios.create({
	headers,
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	timeout: 60 * 1000, // 1 minute
});

instance.interceptors.response.use(
	(config) => config,
	(error) => Promise.reject(error)
);

instance.interceptors.request.use(
	(response) => response,
	(error) => Promise.reject(error)
);
