import { useCallback, useRef, useState } from "react"
import { IListagemPessoas } from "../interfaces"
import { PessoasService } from "../services"

    
export const useListagemPessoas = () => {
    
    const [rows, setRows] = useState<IListagemPessoas[]>()
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState<number>(1)
    const [filter, setFilter] = useState<string>("")
    const inputBuscaRef = useRef<HTMLInputElement>(null)

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

    return {
        inputBuscaRef, 
        handleClickBusca, 
        carregarListagemDePessoas, 
        handleOnchangeInput,
        rows,
        totalCount,
        isLoading,
        page,
        setPage
    }
    
}