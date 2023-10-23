import { useContext } from "react"
import { ThemeContext } from "../contexts"

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    
    if(context === undefined) {
        throw new Error("Não está dentro do contexto!")
    }
    
    return context

}