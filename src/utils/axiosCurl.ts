import { AxiosInstance, AxiosRequestConfig } from 'axios';

class CurlHelper {
  request: AxiosRequestConfig;

  constructor(config: AxiosRequestConfig) {
    this.request = config;
  }

  getHeaders() {
    let headers = this.request.headers,
      curlHeaders = "";

    // get the headers concerning the appropriate method (defined in the global axios instance)
    if (headers.hasOwnProperty("common")) {
      headers = this.request.headers[this.request.method!];
    }

    // add any custom headers (defined upon calling methods like .get(), .post(), etc.)
    for(let property in this.request.headers) {
      if (
        !["common", "delete", "get", "head", "patch", "post", "put"].includes(
          property
        )
      ) {
        headers[property] = this.request.headers[property];
      }
    }

    for(let property in headers) {
      if({}.hasOwnProperty.call(headers, property)) {
        let header = `${property}:${headers[property]}`;
        curlHeaders = `${curlHeaders} -H "${header}"`;
      }
    }

    return curlHeaders.trim();
  }

  getMethod() {
    return `-X ${this.request.method?.toUpperCase()}`;
  }

  getBody() {
    if (
      typeof this.request.data !== "undefined" &&
      this.request.data !== "" &&
      this.request.data !== null &&
      this.request.method?.toUpperCase() !== "GET"
    ) {
      let data =
        typeof this.request.data === "object" ||
        Object.prototype.toString.call(this.request.data) === "[object Array]"
          ? JSON.stringify(this.request.data)
          : this.request.data;
      return `--data '${data}'`.trim();
    } else {
      return "";
    }
  }

  getUrl() {
    if (this.request.baseURL) {
      return `${this.request.baseURL}${this.request.url}`;
    }
    return this.request.url || '';
  }

  getQueryString() {
    let params = "",
      i = 0;

    for(let param in this.request.params) {
      if({}.hasOwnProperty.call(this.request.params, param)) {
        params +=
        i !== 0
          ? `&${param}=${this.request.params[param]}`
          : `?${param}=${this.request.params[param]}`;
        i++;
      }
    }

    return params;
  }

  getBuiltURL() {
    let url = this.getUrl();

    if (this.getQueryString() !== "") {
      url = url.charAt(url.length - 1) === "/" ? url.substr(0, url.length - 1) : url;
      url += this.getQueryString();
    }

    return url.trim();
  }

  generateCommand() {
    return `curl ${this.getMethod()} ${this.getHeaders()} ${this.getBody()} "${this.getBuiltURL()}"`
      .trim()
      .replace(/\s{2,}/g, " ");
  }
}

type CurlResult = {
  command: string;
  object: unknown;
};

function defaultLogCallback(curlResult: CurlResult | null, err: unknown) {
  const command = curlResult?.command;
  if (err) {
    console.error(err);
  } else {
    console.info(command);
  }
}

export default function axiosCurl(instance: AxiosInstance, callback = defaultLogCallback) {
  instance.interceptors.request.use((req) => {
    try {
      const curl = new CurlHelper(req);
      // @ts-ignore
      req.curlObject = curl;
      // @ts-ignore
      req.curlCommand = curl.generateCommand();
      // @ts-ignore
      req.clearCurl = () => {
        // @ts-ignore
        delete req.curlObject;
        // @ts-ignore
        delete req.curlCommand;
        // @ts-ignore
        delete req.clearCurl;
      };
    } catch (err) {
      // Even if the axios middleware is stopped, no error should occur outside.
      callback(null, err);
    } finally {
      // @ts-ignore
      if (req.curlirize !== false) {
        // @ts-ignore
        callback({ command: req.curlCommand, object: req.curlObject });
      }
      return req;
    }
  });
};
