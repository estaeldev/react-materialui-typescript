import { Box, Paper, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

interface IFerramentasDaListagemProps {
    children?: ReactNode | ReactNode[]
}

export const FerramentasDaListagem: FC<IFerramentasDaListagemProps> = ({children}) => {
    
    const theme = useTheme()

    return (
        <Box 
            component={Paper} 
            display="flex"
            height={theme.spacing(5)} 
            marginX={1}
            padding={1}
            paddingX={2}
            alignItems="center"
        >   
            
            {children}

        </Box>
    ) 
    

}
