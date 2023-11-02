import { AxiosConfig } from "../api/axios-config/AxiosConfig"

interface IAuth {
    accessToken: string
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
    try {
        const {data} = await AxiosConfig.get<IAuth>("/auth", {data: {email, password}})
        
        if(data) {
            return data
        }

        throw new Error("Erro no login")

    } catch (error) {
        throw new Error((error as {message: string}).message || "Erro no login")
    }

}

export const AuthService = {
    auth
}
