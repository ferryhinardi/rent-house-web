import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from 'config';

const instance = axios.create({ baseURL: config.apiHost });

async function fetcherClient<T>({ url: urlArg, ...opts }: AxiosRequestConfig) {
  const url = ['/api', urlArg].join('');
  const response = (await instance({
    responseType: 'json',
    url,
    ...opts,
  })) as AxiosResponse<T>;
  return response.data;
}

export default fetcherClient;
