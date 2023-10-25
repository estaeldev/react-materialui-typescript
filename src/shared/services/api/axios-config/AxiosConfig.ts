import axios from "axios";
import { ErrorInterceptor, ResponseInterceptor } from "./interceptors";

export const AxiosConfig = axios.create({
    baseURL: "http://localhost:3333"
})

AxiosConfig.interceptors.response.use(
    (response) => ResponseInterceptor(response), 
    (error) => ErrorInterceptor(error)
)
