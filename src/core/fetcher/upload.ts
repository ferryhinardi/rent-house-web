import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from 'config';
import Cookie from 'js-cookie';
import curlirize from 'utils/axiosCurl';

export const instance = axios.create({
  baseURL: config.apiHost,
});

if (__DEV__) curlirize(instance);

async function clientUpload<T>(options: AxiosRequestConfig) {
  const authentication = Cookie.get('token');
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

export default clientUpload;
