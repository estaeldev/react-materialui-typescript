import { Avatar, Box, Divider, Drawer, List, useMediaQuery, useTheme } from "@mui/material"
import { FC, PropsWithChildren } from "react"
import { useDrawerContext } from "../../hooks"
import { ListItemLink } from "./components/ListItemLink"

export const MenuLateral: FC<PropsWithChildren> = ({children}) => {

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext()

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">

                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar sx={{width: theme.spacing(12), height: theme.spacing(12)}}/>
                    </Box>

                    <Divider />

                    <Box flex={1}> 
                        <List>
                            {drawerOptions?.map((drawerOption) => {
                                return (
                                    <ListItemLink
                                        key={drawerOption.path}
                                        icon={drawerOption.icon}
                                        label={drawerOption.label}
                                        to={drawerOption.path}
                                        onClick={smDown ? toggleDrawerOpen : undefined}
                                    />
                                )
                            })}
                        </List>
                    </Box>                                          

                </Box>
            </Drawer>
            <Box height={"100vh"} marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    )

}
