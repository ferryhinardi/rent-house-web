import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from 'config';
import curlirize from 'utils/axiosCurl';
console.log('config.apiHost', config.apiHost);
export const instance = axios.create({
  baseURL: config.apiHost,
});

if (__DEV__) curlirize(instance);

async function fetcherServer<T>(req: NextApiRequest, res: NextApiResponse<T>, options: AxiosRequestConfig) {
  const cookies = req?.cookies;
  const authentication = cookies?.['token'];
  const headers = {
    ...options.headers,
    ...(authentication ? { Authorization: `Bearer ${authentication}` } : {}),
  };
  // Remove host to solve issue:
  // ErrorCode: [ERR_TLS_CERT_ALTNAME_INVALID]:
  // Message: Hostname/IP does not match certificate's altnames: Host: localhost. is not in the cert's altnames: DNS:sni.cloudflaressl.com, DNS:ondigitalocean.app, DNS:*.ondigitalocean.app
  delete headers.host;

  const response = (await instance({
    ...options,
    responseType: 'json',
    headers,
  })) as AxiosResponse<T>;
  return response?.data;
}

export default fetcherServer;
