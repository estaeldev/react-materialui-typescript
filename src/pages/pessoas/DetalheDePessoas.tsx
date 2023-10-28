import { LinearProgress } from "@mui/material"
import { FormHandles } from "@unform/core"
import { Form } from "@unform/web"
import { FC, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhe } from "../../shared/components"
import { FerramentasDeDetalheButton } from "../../shared/components/ferramentas-de-detalhe/components"
import { FTextField } from "../../shared/forms"
import { IDetalhePessoa } from "../../shared/interfaces"
import { LayoutBase } from "../../shared/layouts"
import { PessoasService } from "../../shared/services"


interface IFormData {
    email: string
    nomeCompleto: string,
    cidadeId: string
} 

export const DetalheDePessoas: FC = () => {

    const {id="nova"} = useParams<"id">()
    const navigate = useNavigate()
    const [pessoa, setPessoa] = useState({} as IDetalhePessoa)
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<FormHandles>(null)
    
    const handleClickButtonVoltar = () => {
        navigate("/pessoas")
    }

    const handleClickButtonNova = () => {
        navigate("/pessoas/detalhe/nova")
    }

    const handleClickButtonSalvar = () => {
        formRef.current?.submitForm()
    }

    const handleClickButtonSalvarEFecha = () => {
        formRef.current?.submitForm()
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

    const handleSave = (data: IFormData) => {
        console.log(data)
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
                    handleClick={handleClickButtonSalvar} 
                />
                <FerramentasDeDetalheButton  
                    label="SALVAR E FECHAR" 
                    iconName="save" 
                    handleClick={handleClickButtonSalvarEFecha}
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
            

            <Form onSubmit={handleSave} ref={formRef}>
                
                <FTextField placeholder="Nome Completo" nome="nomeCompleto" />
                <FTextField placeholder="Email" nome="email" />
                <FTextField placeholder="Cidade Id" nome="cidadeId" />
                

            </Form>
            

            {isLoading && (
                <LinearProgress variant="indeterminate" />
            )}
            
        </LayoutBase>
    )

}
