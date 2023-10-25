import { Box, Icon, TextField } from "@mui/material";
import { FC } from "react";

interface IBarraDeFerramentasTextFieldProps {
    textoDaBusca?: string
    aoMudarTextoDeBusca?: (novoTexto: string) => void
}

export const BarraDeFerramentasTextField: FC<IBarraDeFerramentasTextFieldProps> = ({textoDaBusca="", aoMudarTextoDeBusca}) => {
    
    return (
        <Box display="flex" alignItems="center">
            <TextField 
                size="small" 
                value={textoDaBusca}
                onChange={(event) => aoMudarTextoDeBusca?.(event.target.value)}
                label="Pesquisar" 
                placeholder="Digite aqui..." 
            />
            <Icon>search</Icon> 
        </Box>
    )

}