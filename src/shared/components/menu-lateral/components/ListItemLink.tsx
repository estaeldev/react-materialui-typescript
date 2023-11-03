import { Icon, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { FC, PropsWithChildren } from "react"
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom"

interface IListItemLinkProps {
    label: string
    icon: string
    to: string
    onClick: (() => void) | undefined
}

export const ListItemLink: FC<PropsWithChildren<IListItemLinkProps>> = ({label, icon, to, onClick}) => {

    const navigate = useNavigate()
    const resolvedPath = useResolvedPath(to)
    const match = useMatch({path: resolvedPath.pathname, end: false})

    const handleClick = () => {
        navigate(to)
        onClick?.()
    }
    
    return (
        <ListItemButton onClick={handleClick} selected={!!match}>
            <ListItemIcon> <Icon>{icon}</Icon> </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )

}
