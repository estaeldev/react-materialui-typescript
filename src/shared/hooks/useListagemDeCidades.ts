import { useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IListagemCidades } from "../interfaces"
import { CidadesService } from "../services/api/cidades/CidadesService"

    
export const useListagemDeCidades = () => {
    
    const [rows, setRows] = useState<IListagemCidades[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState<number>(1)
    const [filter, setFilter] = useState<string>("")
    const inputBuscaRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const carregarListagemDeCidades = useCallback(() => {
        setIsLoading(true)

        CidadesService.getAll(page, filter).then(result => {
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
            CidadesService.deleteById(id).then(result => {
                if(result instanceof Error) {
                    alert(result.message)
                    return
                }
                carregarListagemDeCidades()
                alert("Registro apagado com sucesso!")
            })
        }
    }, [carregarListagemDeCidades])

    const handleEdit = (id: number) => {
        navigate(`/cidades/detalhe/${id}`)
    }
    
    const handleClickButton = () => {
        navigate(`/cidades/detalhe/nova`)
    }

    return {
        inputBuscaRef, 
        handleClickBusca, 
        carregarListagemDeCidades, 
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