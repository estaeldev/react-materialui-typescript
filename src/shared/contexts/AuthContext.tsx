import { FC, PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { AuthService } from "../services";

interface IAuthContextData {
    isAuthenticate: boolean
    login: (email: string, password: string) => Promise<string | void>
    logout: () => void
}

export const AuthContextHook = createContext({} as IAuthContextData)

export const AuthContext: FC<PropsWithChildren> = ({children}) => {

    const APP__ACCESS_TOKEN = "APP_ACCESS_TOKEN"
    const [accessToken, setAccessToken] = useState<string>()
    
    const handleLogin = useCallback(async (email: string, password: string) => {
        const result = await AuthService.auth(email, password)
        if(result instanceof Error) {
            return result.message
        }
        localStorage.setItem(APP__ACCESS_TOKEN, JSON.stringify(result.accessToken))
        setAccessToken(result.accessToken)
    }, [])

    const handleLogout = useCallback(() => {
        localStorage.removeItem(APP__ACCESS_TOKEN)
        setAccessToken(undefined)
    }, [])

    const isAuthenticate = useMemo(() => !!accessToken, [accessToken])

    const context = useMemo<IAuthContextData>(() => {
        return {isAuthenticate, login: handleLogin, logout: handleLogout}
    }, [handleLogin, handleLogout, isAuthenticate])


    useEffect(() => {
        const accessToken = localStorage.getItem(APP__ACCESS_TOKEN)
        if(accessToken) {
            setAccessToken(JSON.parse(accessToken))
            return
        }
        setAccessToken(undefined)
    }, [])

    return (
        <AuthContextHook.Provider value={context}>
            {children}
        </AuthContextHook.Provider>
    )

}

