import { FormHandles } from "@unform/core"
import { useCallback, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as Yup from "yup"
import { CidadesService } from "../services"

interface IFormData {
    nome: string
} 

const formValidationSchema: Yup.Schema<IFormData> = Yup.object().shape({
    nome: 
        Yup.string()
        .required("O campo é obrigatório")
        .min(4, "O campo precisa ter pelo menos 4 caracteres")
        .matches(/^[^\d]*$/, "O campo não pode conter números")
})

export const useDetalheDeCidades = () => {

    const {id="nova"} = useParams<"id">()
    const navigate = useNavigate()
    const [nome, setNome] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<FormHandles>(null)
    const isSavingAndNew = useRef(false)
    const isSalvingAndClose = useRef(false)
    
    const handleButtonVoltar = useCallback(() => {
        navigate("/cidades")
    }, [navigate])

    const handleButtonNova = useCallback(() => {
        navigate("/cidades/detalhe/nova")
    }, [navigate])

    const handleButtonSalvar = useCallback(() => {
        isSalvingAndClose.current = false
        isSavingAndNew.current = false
        formRef.current?.submitForm()
    }, [])

    const handleButtonSalvarENovo = useCallback(() => {
        isSalvingAndClose.current = false
        isSavingAndNew.current = true
        formRef.current?.submitForm()
    }, [])

    const handleButtonSalvarEFecha = useCallback(() => {
        isSalvingAndClose.current = true
        isSavingAndNew.current = false
        formRef.current?.submitForm()
    }, [])

    const handleButtonDelete = useCallback((id: number) => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Realmente deseja apagar?")) {
            CidadesService.deleteById(id).then(result => {
                if(result instanceof Error) {
                    alert(result.message)
                    return
                }
                alert("Registro apagado com sucesso!")
                navigate("/cidades")
            })
        }
    }, [navigate])

    const handleSave = useCallback(async (data: IFormData) => {

        await formValidationSchema.validate(data, {abortEarly: false})
            .then(dataValidade => {
                setIsLoading(true)

                if(id === "nova") {
                    CidadesService.create(dataValidade).then(result => {
                        setIsLoading(false)
                        if(result instanceof Error) {
                            alert(result.message)
                            return
                        }
                        alert("Uma nova cidade foi cadastrado!")
                        if(isSalvingAndClose.current) {
                            navigate("/cidades")
                        }
                        formRef.current?.setData({nome: ""})
                    })
                    return
                }

                CidadesService.updateById(Number(id), dataValidade).then(result => {
                    setIsLoading(false)
                    if(result instanceof Error) {
                        alert(result.message)
                    }
                    alert("O cadastro foi atualizado!")
                    if(isSalvingAndClose.current) {
                        navigate("/cidades")
                    } else if(isSavingAndNew.current) {
                        navigate("/cidades/detalhe/nova")
                    }
                })

            }).catch((errors: Yup.ValidationError) => {
                const errorMessages: Record<string, string> = {}
                errors.inner.forEach(error => { 
                    if(error.path) {
                        errorMessages[error.path] = error.message
                    }
                }) 
                formRef.current?.setErrors(errorMessages)
            })
            

    }, [id, navigate])

    const carregarPagina = useCallback(() => {
        if(id !== "nova") {
            setIsLoading(true)
            CidadesService.getById(Number(id)).then(result => {
                setIsLoading(false)
                if(result instanceof Error) {
                    alert(result.message)
                    navigate("/cidades")
                    return
                }
                setNome(result.nome)
                formRef.current?.setData(result)
            })
            return
        }

        formRef.current?.setData({nome: ""})
    }, [id, navigate])
    

    return {
        id,
        formRef,
        nome,
        isLoading,
        setNome,
        handleButtonDelete,
        handleButtonNova,
        handleButtonSalvar,
        handleButtonSalvarEFecha,
        handleButtonSalvarENovo,
        handleButtonVoltar,
        handleSave,
        carregarPagina
    }

}
