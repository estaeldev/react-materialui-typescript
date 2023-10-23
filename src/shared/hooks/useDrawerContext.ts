import { useContext } from "react"
import { DrawerContext } from "../contexts"

export const useDrawerContext = () => {
    const context = useContext(DrawerContext)
    
    if(context === undefined) {
        throw new Error("Não está dentro do contexto!")
    }
    
    return context

}