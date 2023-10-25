import { Button, Icon } from "@mui/material";
import { FC } from "react";

interface IFerramentasDeDetalheProps {
    label: string
    iconName: string
    variant?: "contained" | "outlined"
    handleClick?: () => void
}

export const FerramentasDeDetalheButton: FC<IFerramentasDeDetalheProps> = ({
    label="", iconName="", variant="outlined", handleClick}) => {

    return (
        <Button
            variant={variant}
            color="primary" 
            startIcon={<Icon>{iconName}</Icon>}
            onClick={() => handleClick?.()}>
            {label}
        </Button>
    )

}
