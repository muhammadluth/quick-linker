import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios"

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers.Authorization = `Bearer TOKEN`
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT),
    withCredentials: true
});
instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);
export default instance