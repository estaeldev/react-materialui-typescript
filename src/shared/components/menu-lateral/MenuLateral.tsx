import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import { PropsWithChildren } from "react"

export const MenuLateral: React.FC<PropsWithChildren> = ({children}) => {

    const theme = useTheme()

    return (
        <>
            <Drawer variant="permanent">
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">

                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar sx={{width: theme.spacing(12), height: theme.spacing(12)}}/>
                    </Box>

                    <Divider />

                    <Box flex={1}> 
                        <List>
                            <ListItemButton>
                                <ListItemIcon> <Icon>home</Icon> </ListItemIcon>
                                <ListItemText primary="Página inicial" />
                            </ListItemButton>
                        </List>

                    </Box>
                </Box>
            </Drawer>
            <Box height={"100vh"} marginLeft={theme.spacing(28)}>
                {children}
            </Box>
        </>
    )

}
