import { FC, useEffect } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { FerramentasDaListagemButton, FerramentasDaListagemTextField } from "../../shared/components/ferramentas-da-listagem/components";
import { useListagemPessoas } from "../../shared/hooks";
import { LayoutBase } from "../../shared/layouts";

export const ListagemPessoas: FC = () => {

    const {inputBuscaRef, handleClickBusca, carregarTodasPessoas, handleOnchangeInput} = useListagemPessoas()

    useEffect(() => {
        carregarTodasPessoas()
    }, [carregarTodasPessoas])
    
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
            

        </LayoutBase>
    )

}
