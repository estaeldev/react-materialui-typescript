import { Box, Icon, IconButton, TextField, TextFieldProps, Typography } from "@mui/material";
import { FC } from "react";
import { Environment } from "../../../environments";

type TFerramentasDaListagemTextFieldProps = {
    handleClickBusca?: () => void
} & TextFieldProps

export const FerramentasDaListagemTextField: FC<TFerramentasDaListagemTextFieldProps> = ({
    handleClickBusca, ...rest}) => {
    
    return (
        <Box display="flex" alignItems="center">
            <TextField {...rest}
                size="small"
                label="Pesquisar" 
                placeholder={Environment.INPUT_DE_BUSCA}
            />
            <IconButton color="primary" onClick={handleClickBusca}>
                <Icon>person_search</Icon> 
                <Typography>BUSCAR</Typography>    
            </IconButton>
        </Box>
    )

}
