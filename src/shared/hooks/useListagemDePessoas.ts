import { useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IListagemPessoas } from "../interfaces"
import { PessoasService } from "../services"

    
export const useListagemDePessoas = () => {
    
    const [rows, setRows] = useState<IListagemPessoas[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState<number>(1)
    const [filter, setFilter] = useState<string>("")
    const inputBuscaRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()


    const carregarListagemDePessoas = useCallback(() => {
        setIsLoading(true)

        PessoasService.getAll(page, filter).then(result => {
            setIsLoading(false)

            if(result instanceof Error) {
                alert(result.message)
                return
            }

            setRows(result.data)
            setTotalCount(result.totalCount)
        })
    }, [page, filter])

    const handleClickBusca = useCallback(() => {
        const value = inputBuscaRef.current?.value
        if(value) {
            setPage(1)
            setFilter(value)
        }
    }, [])

    const handleOnchangeInput = useCallback(() => {
        const value = inputBuscaRef.current?.value
        if(!value) {
            setPage(1)
            setFilter("")
        }
    }, [])

    const handleDelete = useCallback((id: number) => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Realmente deseja apagar?")) {
            PessoasService.deleteById(id).then(result => {
                if(result instanceof Error) {
                    alert(result.message)
                    return
                }
                carregarListagemDePessoas()
                alert("Registro apagado com sucesso!")
            })
        }
    }, [carregarListagemDePessoas])

    const handleEdit = (id: number) => {
        navigate(`/pessoas/detalhe/${id}`)
    }
    
    const handleClickButton = () => {
        navigate(`/pessoas/detalhe/nova`)
    }

    return {
        inputBuscaRef, 
        handleClickBusca, 
        carregarListagemDePessoas, 
        handleOnchangeInput,
        rows,
        totalCount,
        isLoading,
        page,
        setPage,
        handleDelete,
        handleEdit,
        handleClickButton
    }
    
}