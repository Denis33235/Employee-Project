import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface AxiosRequestOptions<D> extends AxiosRequestConfig<D> {
  excludeAuthentication?: boolean;
}


export async function apiRequest<D = {}, R = unknown>({ url, method, data, headers, params }: AxiosRequestOptions<D>) {
  return await Axios.request<D, AxiosResponse<R>>({
    url: `http://localhost:4000/${url}`,
    method,
    data,
    headers,
    params,
  });
}
