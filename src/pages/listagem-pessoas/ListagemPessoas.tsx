import { FC, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { FerramentasDaListagemButton, FerramentasDaListagemTextField } from "../../shared/components/ferramentas-da-listagem/components";
import { LayoutBase } from "../../shared/layouts";
import { PessoasService } from "../../shared/services";

export const ListagemPessoas: FC = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const busca = useMemo(() => {
        return searchParams.get("busca") ?? ""
    }, [searchParams])
    

    useEffect(() => {
        PessoasService.getAll().then((result) => {
            if(result instanceof Error) {
                alert(result.message)
                return
            }
            console.log(result)
        })
    }, [])

    return (
        <LayoutBase titulo="Listagem de Pessoas">

            <FerramentasDaListagem>
                <FerramentasDaListagemTextField 
                    textoDaBusca={busca} 
                    aoMudarTextoDeBusca={texto => setSearchParams({busca: texto}, {replace: true})}
                />
                <FerramentasDaListagemButton textoBotaoNovo="Nova"/>
            </FerramentasDaListagem>
            

        </LayoutBase>
    )

}
