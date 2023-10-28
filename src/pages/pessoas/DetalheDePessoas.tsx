import { LinearProgress } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhe } from "../../shared/components"
import { FerramentasDeDetalheButton } from "../../shared/components/ferramentas-de-detalhe/components"
import { IDetalhePessoa } from "../../shared/interfaces"
import { LayoutBase } from "../../shared/layouts"
import { PessoasService } from "../../shared/services"

export const DetalheDePessoas: FC = () => {

    const {id="nova"} = useParams<"id">()
    const navigate = useNavigate()
    const [pessoa, setPessoa] = useState({} as IDetalhePessoa)
    const [isLoading, setIsLoading] = useState(false)

    const handleClickButtonVoltar = () => {
        navigate("/pessoas")
    }

    const handleClickButtonNova = () => {
        navigate("/pessoas/detalhe/nova")
    }

    const handleClickButtonDelete = (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Realmente deseja apagar?")) {
            PessoasService.deleteById(id).then(result => {
                if(result instanceof Error) {
                    alert(result.message)
                    return
                }
                alert("Registro apagado com sucesso!")
                navigate("/pessoas")
            })
        }
    }
    
    useEffect(() => {
        if(id !== "nova") {
            setIsLoading(true)
            PessoasService.getById(Number(id)).then(result => {
                setIsLoading(false)
                if(result instanceof Error) {
                    alert(result.message)
                    navigate("/pessoas")
                    return
                }
                setPessoa(result)
            })
        }
    }, [id, navigate])
    
    return (
        <LayoutBase titulo={isLoading ? "Carregando..." : id === "nova" ? "Nova Pessoa" :  pessoa.nomeCompleto}>
            
            <FerramentasDeDetalhe>
                <FerramentasDeDetalheButton  
                    label="SALVAR" 
                    iconName="save" 
                    variant="contained" 
                />
                <FerramentasDeDetalheButton  
                    label="SALVAR E FECHAR" 
                    iconName="save" 
                    
                />
                {id !== "nova" && (
                    <FerramentasDeDetalheButton  
                        label="APAGAR" 
                        iconName="delete" 
                        startDivider
                        handleClick={() => handleClickButtonDelete(pessoa.id)}
                    />
                )}
                {id !== "nova" && (
                    <FerramentasDeDetalheButton  
                        label="NOVA" 
                        iconName="add" 
                        handleClick={handleClickButtonNova}
                    />
                )}

                <FerramentasDeDetalheButton  
                    label="VOLTAR" 
                    iconName="arrow_back" 
                    startDivider
                    handleClick={handleClickButtonVoltar}
                />
            </FerramentasDeDetalhe>

            {isLoading && (
                <LinearProgress variant="indeterminate" />
            )}
            
        </LayoutBase>
    )

}
