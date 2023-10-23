import { FC, ReactNode, createContext, useCallback, useMemo, useState } from "react";

interface IDrawerOptions {
    label: string
    icon: string
    path: string
}

interface IDrawerContextData {
    isDrawerOpen?: boolean
    drawerOptions?: IDrawerOptions[]
    toggleDrawerOpen?: () => void
    setDrawerOptions?: (newDrawerOptions: IDrawerOptions[]) => void
    children?: ReactNode
}

export const DrawerContext = createContext({} as IDrawerContextData)

export const AppDrawerProvider: FC<IDrawerContextData> = ({children}) => {
    
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([])

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, [])

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
        setDrawerOptions(newDrawerOptions)
    }, [])
    
    const context = useMemo(() => {
        return {isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions: handleSetDrawerOptions}
    }, [isDrawerOpen, toggleDrawerOpen, drawerOptions, handleSetDrawerOptions])

    return (
        <DrawerContext.Provider value={context}>
            {children}
        </DrawerContext.Provider>
    )

}
