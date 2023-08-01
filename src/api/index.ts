import axios from 'axios';

export const baseURL = 'https://tes-mobile.landa.id/api/'
export const api = axios.create({
	baseURL: baseURL,
});



export const fetcher = (url: string) => api.get(url).then((res) => res.data);
