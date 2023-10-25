import { Box, Paper, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

interface IBarraDeFerramentasProps {
    children?: ReactNode | ReactNode[]
}

export const BarraDeFerramentas: FC<IBarraDeFerramentasProps> = ({children}) => {

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
