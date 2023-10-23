import { Button } from "@mui/material"
import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useDrawerContext } from "../shared/hooks"

export const AppRoutes = () => {

    const {toggleDrawerOpen, setDrawerOptions} = useDrawerContext()

    useEffect(() => {
        setDrawerOptions?.([
            {
                icon: "home",
                label: "Página Inicial",
                path: "/pagina-inicial"
            }
        ])
    }, [setDrawerOptions])
    
    return (
        <>
            <Routes>
                <Route path="/pagina-inicial" element={<Button variant="contained" 
                                                                color="primary"
                                                                onClick={toggleDrawerOpen}>
                                                                Toggle Drawer Open
                                                        </Button>} />

                <Route path="*" element={<Navigate to={"/pagina-inicial"}/>} />
            </Routes>
        </>
    )

}
