import { AxiosError } from "axios";

export const ErrorInterceptor = (error: AxiosError) => {

    if(error.message === "Network Error") {
        return Promise.reject(new Error("Erro de Conexão."))
    }

    if(error.response?.status === 401) {
        return Promise.reject(new Error("Erro de Autenticação."))
    }

    return Promise.reject(error)

}
