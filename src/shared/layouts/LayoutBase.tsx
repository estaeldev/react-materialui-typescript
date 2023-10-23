import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";
import { useDrawerContext } from "../hooks";

interface ILayoutBaseProps {
    titulo: string
    children?: ReactNode
}

export const LayoutBase: FC<ILayoutBaseProps> = ({children, titulo}) => {

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    const {toggleDrawerOpen} = useDrawerContext()

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>

            <Box padding={1} display="flex" alignItems="center" gap={1} height={theme.spacing(12)}>
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}
                <Typography variant="h5">
                    {titulo}
                </Typography>
            </Box>

            <Box>
                Barra de Ferramentas
            </Box>

            <Box>
                {children}
            </Box>

        </Box>
    )

}

