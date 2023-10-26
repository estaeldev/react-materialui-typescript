import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC, useEffect } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { FerramentasDaListagemButton, FerramentasDaListagemTextField } from "../../shared/components/ferramentas-da-listagem/components";
import { useListagemPessoas } from "../../shared/hooks";
import { LayoutBase } from "../../shared/layouts";

export const ListagemPessoas: FC = () => {

    const {
        inputBuscaRef, 
        handleClickBusca, 
        carregarListagemDePessoas, 
        handleOnchangeInput,
        rows
    } = useListagemPessoas()

    useEffect(() => {
        carregarListagemDePessoas()
    }, [carregarListagemDePessoas])
    
    return (
        <LayoutBase titulo="Listagem de Pessoas">

            <FerramentasDaListagem>
                <FerramentasDaListagemTextField 
                    inputBuscaRef={inputBuscaRef} 
                    handleClickBusca={handleClickBusca}
                    handleOnchangeInput={handleOnchangeInput}
                />
                <FerramentasDaListagemButton textoBotaoNovo="Nova"/>
            </FerramentasDaListagem>
            
            <TableContainer component={Paper} variant="outlined" sx={{m: 1, width: "auto"}}>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows?.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>{}</TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

        </LayoutBase>
    )

}
