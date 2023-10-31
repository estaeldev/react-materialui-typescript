import { FormHandles } from "@unform/core"
import { useCallback, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as Yup from "yup"
import { PessoasService } from "../services"

interface IFormData {
    email: string
    nomeCompleto: string,
    cidadeId: number,
} 

const formValidationSchema: Yup.Schema<IFormData> = Yup.object().shape({
    nomeCompleto: Yup.string().required().min(3),
    email: Yup.string().required().email(),
    cidadeId: Yup.number().required()
})

export const useDetalheDePessoas = () => {

    const {id="nova"} = useParams<"id">()
    const navigate = useNavigate()
    const [nome, setNome] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<FormHandles>(null)
    const isSavingAndNew = useRef(false)
    const isSalvingAndClose = useRef(false)
    
    const handleButtonVoltar = useCallback(() => {
        navigate("/pessoas")
    }, [navigate])

    const handleButtonNova = useCallback(() => {
        navigate("/pessoas/detalhe/nova")
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
            PessoasService.deleteById(id).then(result => {
                if(result instanceof Error) {
                    alert(result.message)
                    return
                }
                alert("Registro apagado com sucesso!")
                navigate("/pessoas")
            })
        }
    }, [navigate])

    const handleSave = useCallback(async (data: IFormData) => {

        await formValidationSchema.validate(data, {abortEarly: false})
            .then(dataValidade => {
                setIsLoading(true)

                if(id === "nova") {
                    PessoasService.create(dataValidade).then(result => {
                        setIsLoading(false)
                        if(result instanceof Error) {
                            alert(result.message)
                            return
                        }
                        alert("Uma nova pessoas foi cadastrado!")
                        if(isSalvingAndClose.current) {
                            navigate("/pessoas")
                        }
                        formRef.current?.setData({nomeCompleto: "", email: "", cidadeId: ""})
                    })
                    return
                }

                PessoasService.updateById(Number(id), dataValidade).then(result => {
                    setIsLoading(false)
                    if(result instanceof Error) {
                        alert(result.message)
                    }
                    alert("O cadastro foi atualizado!")
                    if(isSalvingAndClose.current) {
                        navigate("/pessoas")
                    } else if(isSavingAndNew.current) {
                        navigate("/pessoas/detalhe/nova")
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
            PessoasService.getById(Number(id)).then(result => {
                setIsLoading(false)
                if(result instanceof Error) {
                    alert(result.message)
                    navigate("/pessoas")
                    return
                }
                setNome(result.nomeCompleto)
                formRef.current?.setData(result)
            })
            return
        }

        formRef.current?.setData({nomeCompleto: "", email: "", cidadeId: ""})
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
