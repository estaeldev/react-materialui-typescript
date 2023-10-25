import { Box, Button, Icon } from "@mui/material";
import { FC } from "react";

interface IBarraDeFerramentasButtonProps {
    textoBotaoNovo?: string
    aoClicarEmNovoBotao?: () => void
}

export const BarraDeFerramentasButton: FC<IBarraDeFerramentasButtonProps> = ({textoBotaoNovo="Novo", aoClicarEmNovoBotao}) => {

    return (
        <Box flex={1} display="flex" justifyContent="end">
            <Button

                variant="contained" 
                color="primary" 
                endIcon={<Icon>add</Icon>}
                onClick={aoClicarEmNovoBotao}>
                {textoBotaoNovo}
            </Button>
        </Box>
    )

}