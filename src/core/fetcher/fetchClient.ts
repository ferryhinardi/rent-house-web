import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import config from 'config';

const instance = axios.create({ baseURL: config.appHost });

async function fetcherClient<T>({ url: urlArg, ...opts }: AxiosRequestConfig) {
  const url = ['/api', urlArg].join('');
  try {
    const response = (await instance({
      responseType: 'json',
      url,
      ...opts,
    })) as AxiosResponse<T>;
    return response.data;
  } catch (err) {
    throw new Error(
      (err as AxiosError<{ message: string }>).response?.data.message
    );
  }
}

export default fetcherClient;
