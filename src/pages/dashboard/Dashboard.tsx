import { FC } from "react"
import { BarraDeFerramentas } from "../../shared/components"
import { BarraDeFerramentasButton, BarraDeFerramentasTextField } from "../../shared/components/barra-de-ferramentas/components"
import { LayoutBase } from "../../shared/layouts"

export const Dashboard: FC = () => {

    return (
        <LayoutBase titulo="Página Inicial">
            <BarraDeFerramentas>
                <BarraDeFerramentasTextField />
                <BarraDeFerramentasButton />
            </BarraDeFerramentas>
            Testando
        </LayoutBase>
    )

}
