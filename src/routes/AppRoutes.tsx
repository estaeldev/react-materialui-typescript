import { Button } from "@mui/material"
import { Navigate, Route, Routes } from "react-router-dom"
import { useThemeContext } from "../shared/hooks"

export const AppRoutes = () => {

    const {toggleTheme} = useThemeContext()

    return (
        <>
            <Routes>
                <Route path="/pagina-inicial" element={<Button variant="contained" 
                                                                color="primary"
                                                                onClick={toggleTheme}>
                                                                Toggle Theme
                                                        </Button>} />

                <Route path="*" element={<Navigate to={"/pagina-inicial"}/>} />
            </Routes>
        </>
    )

}
