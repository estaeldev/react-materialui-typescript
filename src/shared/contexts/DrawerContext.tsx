import { PropsWithChildren, createContext, useCallback, useMemo, useState } from "react";

interface IDrawerContextData {
    isDrawerOpen?: boolean
    toggleDrawerOpen?: () => void
}

export const DrawerContext = createContext({} as IDrawerContextData)

export const AppDrawerProvider: React.FC<PropsWithChildren<IDrawerContextData>> = ({children}) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, [])
    
    const context = useMemo(() => {
        return {isDrawerOpen, toggleDrawerOpen}
    }, [isDrawerOpen, toggleDrawerOpen])

    return (
        <>
            <DrawerContext.Provider value={context}>
                {children}
            </DrawerContext.Provider>
        </>
    )

}
