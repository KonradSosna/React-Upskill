import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';

export function registerInterceptor({
  httpClient,
  requestCallback,
  responseCallback,
}: {
  httpClient: Axios;
  requestCallback: (request: AxiosRequestConfig) => void;
  responseCallback: (request: AxiosResponse) => void;
}) {
  httpClient.interceptors.request.use((request) => {
    requestCallback(request);
    return request;
  });
  httpClient.interceptors.response.use((response) => {
    responseCallback(response);
    return response;
  });
}
