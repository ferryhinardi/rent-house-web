import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_HOST;
const instance = axios.create({ baseURL });

async function fetcher<T>(options: AxiosRequestConfig) {
  const response = await instance({
    responseType: 'json',
    ...options,
  }) as AxiosResponse<T>;
  return response.data;
}

export default fetcher;
