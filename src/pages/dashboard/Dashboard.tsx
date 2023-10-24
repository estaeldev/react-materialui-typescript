import { FC } from "react"
import { LayoutBase } from "../../shared/layouts"
import { BarraDeFerramenta } from "../../shared/components"

export const Dashboard: FC = () => {

    return (
        <LayoutBase titulo="Página Inicial" barraDeFerramentas={<BarraDeFerramenta mostrarInputBusca />}>
            Testando
        </LayoutBase>
    )

}
