import { Box, Icon, IconButton, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Environment } from "../../../environments";

interface IFerramentasDaListagemTextFieldProps {
    inputBuscaRef?: any
    handleClickBusca?: () => void
    handleOnchangeInput?: () => void
}

export const FerramentasDaListagemTextField: FC<IFerramentasDaListagemTextFieldProps> = ({
    inputBuscaRef, handleClickBusca, handleOnchangeInput}) => {
    
    return (
        <Box display="flex" alignItems="center">
            <TextField 
                size="small"
                inputRef={inputBuscaRef}
                onChange={handleOnchangeInput}
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
