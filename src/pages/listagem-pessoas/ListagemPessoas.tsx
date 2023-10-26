import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { FC, useEffect } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { FerramentasDaListagemButton, FerramentasDaListagemTextField } from "../../shared/components/ferramentas-da-listagem/components";
import { useListagemPessoas } from "../../shared/hooks";
import { LayoutBase } from "../../shared/layouts";
import { Environment } from "../../shared/environments";

export const ListagemPessoas: FC = () => {

    const {
        inputBuscaRef, 
        handleClickBusca, 
        carregarListagemDePessoas, 
        handleOnchangeInput,
        rows,
        isLoading,
        totalCount,
        page,
        setPage
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

                    <TableFooter>
                        {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHA && (
                            <TableRow>
                                <TableCell>
                                    <Pagination 
                                        count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHA)} 
                                        page={page}
                                        onChange={(_, newPage) => setPage(newPage)}
                                        color="primary"
                                    />
                                </TableCell>
                            </TableRow>
                        )}

                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3} sx={{p: 0}}>
                                    <LinearProgress variant="indeterminate" />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                </Table>
            </TableContainer>

        </LayoutBase>
    )

}
