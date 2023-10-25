import { Box, Icon, TextField } from "@mui/material";
import { FC } from "react";
import { Environment } from "../../../environments";

interface IFerramentasDaListagemTextFieldProps {
    textoDaBusca?: string
    aoMudarTextoDeBusca?: (novoTexto: string) => void
}

export const FerramentasDaListagemTextField: FC<IFerramentasDaListagemTextFieldProps> = ({
    textoDaBusca="", aoMudarTextoDeBusca}) => {
    
    return (
        <Box display="flex" alignItems="center">
            <TextField 
                size="small" 
                value={textoDaBusca}
                onChange={(event) => aoMudarTextoDeBusca?.(event.target.value)}
                label="Pesquisar" 
                placeholder={Environment.INPUT_DE_BUSCA}
            />
            <Icon>search</Icon> 
        </Box>
    )

}