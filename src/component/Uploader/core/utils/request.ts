import axios, { AxiosRequestConfig } from "axios";
import { Response } from "../types";
import { HTTPError, RequestCanceledError } from "../errors";

export const { CancelToken } = axios;
export { CancelToken as CancelTokenType, CancelTokenSource } from "axios";

const defaultConfig = {
    baseURL: "/api/v3",
    withCredentials: true,
    transformResponse: [(response: any) => JSON.parse(response)],
};

export function requestAPI<T = any>(url: string, config?: AxiosRequestConfig) {
    return axios
        .request<Response<T>>({ ...defaultConfig, ...config, url })
        .catch((err) => {
            if (axios.isCancel(err)) {
                throw new RequestCanceledError();
            }

            throw new HTTPError(err, url);
        });
}
