import { FC } from "react"
import { FerramentasDaListagem } from "../../shared/components"
import { FerramentasDaListagemButton, FerramentasDaListagemTextField } from "../../shared/components/ferramentas-da-listagem/components"
import { LayoutBase } from "../../shared/layouts"

export const Dashboard: FC = () => {

    return (
        <LayoutBase titulo="Página Inicial">
            <FerramentasDaListagem>
                <FerramentasDaListagemTextField />
                <FerramentasDaListagemButton />
            </FerramentasDaListagem>
            Testando
        </LayoutBase>
    )

}
