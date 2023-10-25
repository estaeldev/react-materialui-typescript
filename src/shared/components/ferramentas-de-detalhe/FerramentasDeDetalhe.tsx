import { Box, Paper, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

interface IFerramentasDeDetalheProps {
    children?: ReactNode | ReactNode[]
}

export const FerramentasDeDetalhe: FC<IFerramentasDeDetalheProps> = ({children}) => {

    const theme = useTheme()

    return (
        <Box 
        component={Paper} 
        display="flex"
        height={theme.spacing(5)} 
        gap={1}
        marginX={1}
        padding={1}
        paddingX={2}
        alignItems="center"
        > 
            
            {children}

        </Box>
    )

}
