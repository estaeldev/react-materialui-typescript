import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { MenuLateral } from "./shared/components"
import { AppDrawerProvider, AppThemeProvider, AuthContext } from "./shared/contexts"
import { Login } from "./pages"

export const App = () => {

    return (
        <AuthContext>
            <AppThemeProvider>
                <Login>
                    <AppDrawerProvider>
                        <BrowserRouter>
                            <MenuLateral >
                                <AppRoutes />
                            </MenuLateral>
                        </BrowserRouter>
                    </AppDrawerProvider>
                </Login>
            </AppThemeProvider>
        </AuthContext>
    )
}

