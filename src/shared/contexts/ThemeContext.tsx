import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import { FC, ReactNode, createContext, useCallback, useMemo, useState } from "react";
import { DarkTheme, LightTheme } from "../themes";

interface IThemeContextData {
    themeName?: "light" | "dark"
    toggleTheme?: () => void
    children?: ReactNode
}

export const ThemeContext = createContext({} as IThemeContextData)

export const AppThemeProvider: FC<IThemeContextData> = ({children}) => {

    const [themeName, setThemeName] = useState<"light" | "dark">("light")

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === "light" ? "dark" : "light")
    }, [])

    const theme = useMemo(() => {
        if(themeName === "light") return LightTheme
        return DarkTheme
    }, [themeName])

    const context = useMemo(() => {
        return {themeName, toggleTheme}
    }, [themeName, toggleTheme])

    return (
        <ThemeContext.Provider value={context}>
            <ThemeProvider theme={theme}>
            <Box width={"100vw"} height={"100vh"} bgcolor={theme.palette.background.default}>
                {children}
            </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )

}