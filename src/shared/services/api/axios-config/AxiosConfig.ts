import axios from "axios";
import { Environment } from "../../../environments";
import { ErrorInterceptor, ResponseInterceptor } from "./interceptors";

export const AxiosConfig = axios.create({
    baseURL: Environment.URL_BASE
})

AxiosConfig.interceptors.response.use(
    (response) => ResponseInterceptor(response), 
    (error) => ErrorInterceptor(error)
)
