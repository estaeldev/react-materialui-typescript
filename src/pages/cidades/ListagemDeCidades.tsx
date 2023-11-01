import { FC, useEffect } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { FerramentasDaListagemButton, FerramentasDaListagemTextField } from "../../shared/components/ferramentas-da-listagem/components";
import { useListagemDeCidades } from "../../shared/hooks/useListagemDeCidades";
import { LayoutBase } from "../../shared/layouts";
import { TBody, THead, TableDeCidades } from "./components";

export const ListagemCidades: FC = () => {

    const {
        inputBuscaRef, 
        rows,
        isLoading,
        totalCount,
        page,
        handleClickBusca, 
        carregarListagemDeCidades, 
        handleOnchangeInput,
        setPage,
        handleDelete,
        handleEdit,
        handleClickButton
    } = useListagemDeCidades()

    useEffect(() => {
        carregarListagemDeCidades()
    }, [carregarListagemDeCidades])
    
    return (
        <LayoutBase titulo="Listagem de Cidades">

            <FerramentasDaListagem>
                <FerramentasDaListagemTextField 
                    inputRef={inputBuscaRef} 
                    handleClickBusca={handleClickBusca}
                    onChange={handleOnchangeInput}
                />
                <FerramentasDaListagemButton textoBotaoNovo="Nova" aoClicarEmNovoBotao={handleClickButton}/>
            </FerramentasDaListagem>        

            <TableDeCidades totalCount={totalCount} page={page} setPage={setPage} isLoading={isLoading}>
                
                <THead listHeads={["Ações", "Nome"]} />
                <TBody listData={rows} handleDelete={handleDelete} handleEdit={handleEdit} />
                
            </TableDeCidades>

        </LayoutBase>
    )

}
