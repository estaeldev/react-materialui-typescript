import { useContext } from "react"
import { AuthContextHook } from "../contexts"

export const useAuthContext = () => {

    const context = useContext(AuthContextHook)
    
    if(context === undefined) {
        throw new Error("Não está dentro do contexto!")
    }
    
    return context

}
