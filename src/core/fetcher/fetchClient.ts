import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_APP_HOST;
const instance = axios.create({ baseURL });

async function fetcherClient<T>({ url: urlArg, ...opts }: AxiosRequestConfig) {
  const url = ['/api', urlArg].join('');
  const response = await instance({
    responseType: 'json',
    url,
    ...opts,
  }) as AxiosResponse<T>;
  return response.data;
}

export default fetcherClient;
