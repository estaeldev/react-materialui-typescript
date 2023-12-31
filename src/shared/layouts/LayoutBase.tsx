import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";
import { useDrawerContext } from "../hooks";

interface ILayoutBaseProps {
    titulo: string
    children?: ReactNode | ReactNode[]
}

export const LayoutBase: FC<ILayoutBaseProps> = ({titulo, children}) => {

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    const {toggleDrawerOpen} = useDrawerContext()

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>

            <Box padding={1} display="flex" alignItems="center" gap={1} height={theme.spacing(smDown? 6 : 12)}>
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}

                <Typography variant={smDown? "h5" : "h3"} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                    {titulo}
                </Typography>
                
            </Box>

           {children}

        </Box>
    )

}

