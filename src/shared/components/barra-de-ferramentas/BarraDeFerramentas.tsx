import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

interface IBarraDeFerramentaProps {
    textoDaBusca?: string
    mostrarInputBusca?: boolean
    aoMudarTextoDeBusca?: (novoTexto: string) => void
    textoBotaoNovo?: string
    mostrarBotaoNovo?: boolean
    aoClicarEmNovoBotao?: () => void
    children?: ReactNode
}

export const BarraDeFerramenta: FC<IBarraDeFerramentaProps> = ({
    textoDaBusca="", 
    mostrarInputBusca=false, 
    aoMudarTextoDeBusca,
    textoBotaoNovo="Novo",
    mostrarBotaoNovo=true,
    aoClicarEmNovoBotao
}) => {

    const theme = useTheme()

    return (
        <Box 
            component={Paper} 
            display="flex"
            height={theme.spacing(5)} 
            marginX={1}
            padding={1}
            paddingX={2}
            alignItems="center"
        >   

            {mostrarInputBusca && (
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
            )}

            {mostrarBotaoNovo && (
                <Box flex={1} display="flex" justifyContent="end">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        endIcon={<Icon>add</Icon>}
                        onClick={aoClicarEmNovoBotao}>
                        {textoBotaoNovo}
                    </Button>
                </Box>
            )}

        </Box>
    ) 
    

}
