import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Dashboard, ListagemPessoas } from "../pages"
import { useDrawerContext } from "../shared/hooks"

export const AppRoutes = () => {

    const {setDrawerOptions} = useDrawerContext()

    useEffect(() => {
        setDrawerOptions?.([
            {
                icon: "home",
                label: "Página Inicial",
                path: "/pagina-inicial"
            },
            {
                icon: "peoples",
                label: "Pessoas",
                path: "/pessoas"
            }
        ])
    }, [setDrawerOptions])
    
    return (
        <>
            <Routes>
                <Route path="/pagina-inicial" element={<Dashboard />} />
                <Route path="/pessoas" element={<ListagemPessoas />} />
                <Route path="/pessoas/detalhe/:id" element={<p>Detalhe</p>} />

                <Route path="*" element={<Navigate to={"/pagina-inicial"}/>} />
            </Routes>
        </>
    )

}
