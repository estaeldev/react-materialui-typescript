import { FC, useEffect } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { FerramentasDaListagemButton, FerramentasDaListagemTextField } from "../../shared/components/ferramentas-da-listagem/components";
import { useListagemDePessoas } from "../../shared/hooks";
import { LayoutBase } from "../../shared/layouts";
import { TableDePessoas, TableDePessoasBody, TableDePessoasHead } from "./components";

export const ListagemPessoas: FC = () => {

    const {
        inputBuscaRef, 
        rows,
        isLoading,
        totalCount,
        page,
        handleClickBusca, 
        carregarListagemDePessoas, 
        handleOnchangeInput,
        setPage,
        handleDelete,
        handleEdit,
        handleClickButton
    } = useListagemDePessoas()

    useEffect(() => {
        carregarListagemDePessoas()
    }, [carregarListagemDePessoas])
    
    return (
        <LayoutBase titulo="Listagem de Pessoas">

            <FerramentasDaListagem>
                <FerramentasDaListagemTextField 
                    inputRef={inputBuscaRef} 
                    handleClickBusca={handleClickBusca}
                    onChange={handleOnchangeInput}
                />
                <FerramentasDaListagemButton textoBotaoNovo="Nova" aoClicarEmNovoBotao={handleClickButton}/>
            </FerramentasDaListagem>    

            <TableDePessoas totalCount={totalCount} page={page} setPage={setPage} isLoading={isLoading}>
                
                <TableDePessoasHead listHeads={["Ações", "Nome Completo", "Email", "Cidade"]} />
                <TableDePessoasBody listData={rows} handleDelete={handleDelete} handleEdit={handleEdit} />
                
            </TableDePessoas>

        </LayoutBase>
    )

}
