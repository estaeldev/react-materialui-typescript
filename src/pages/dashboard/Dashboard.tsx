import { Theme, useMediaQuery } from "@mui/material"
import { FC, useCallback } from "react"
import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components"
import { FerramentasDaListagemButton, FerramentasDaListagemTextField } from "../../shared/components/ferramentas-da-listagem/components"
import { FerramentasDeDetalheButton } from "../../shared/components/ferramentas-de-detalhe/components"
import { LayoutBase } from "../../shared/layouts"

export const Dashboard: FC = () => {

    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

    const handleClickSalvar = useCallback(() => {
        
    }, [])

    const handleClickSalvarEVoltar = useCallback(() => {
        
    }, [])

    const handleClickApagar = useCallback(() => {
        
    }, [])

    const handleClickNovo = useCallback(() => {
        
    }, [])

    const handleClickVoltar = useCallback(() => {
        
    }, [])
    

    return (
        <LayoutBase titulo="Página Inicial">

            <FerramentasDaListagem>
                <FerramentasDaListagemTextField />
                <FerramentasDaListagemButton />
            </FerramentasDaListagem>

            <FerramentasDeDetalhe >

                <FerramentasDeDetalheButton  
                    label="SALVAR" 
                    iconName="save" 
                    variant="contained" 
                    handleClick={handleClickSalvar}
                />
                <FerramentasDeDetalheButton  
                    label="SALVAR E FECHAR" 
                    iconName="save" 
                    handleClick={handleClickSalvarEVoltar}
                    isEsconder={mdDown}
                />
                <FerramentasDeDetalheButton  
                    label="APAGAR" 
                    iconName="delete" 
                    handleClick={handleClickApagar}
                    startDivider
                />
                <FerramentasDeDetalheButton  
                    label="NOVO" 
                    iconName="add" 
                    handleClick={handleClickNovo} 
                    isEsconder={smDown}
                />

                <FerramentasDeDetalheButton  
                    label="VOLTAR" 
                    iconName="arrow_back" 
                    handleClick={handleClickVoltar}
                    startDivider
                />

            </FerramentasDeDetalhe>

            Testando
        </LayoutBase>
    )

}
