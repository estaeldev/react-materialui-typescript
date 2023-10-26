import { useCallback, useRef, useState } from "react"
import { IListagemPessoas } from "../interfaces"
import { PessoasService } from "../services"

    
export const useListagemPessoas = () => {
    
    const [rows, setRows] = useState<IListagemPessoas[]>()
    const [totalCount, setTotalCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState<number>(1)
    const inputBuscaRef = useRef<HTMLInputElement>(null)

    const carregarListagemDePessoas = useCallback((filter?: string) => {
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
    }, [page])

    const handleClickBusca = useCallback(() => {
        const value = inputBuscaRef.current?.value
        if(value) {
            carregarListagemDePessoas(value)
        }
    
    }, [carregarListagemDePessoas])

    const handleOnchangeInput = useCallback(() => {
        const value = inputBuscaRef.current?.value
        if(!value) {
            carregarListagemDePessoas()
        }
    }, [carregarListagemDePessoas])

    return {
        inputBuscaRef, 
        handleClickBusca, 
        carregarListagemDePessoas, 
        setPage, 
        handleOnchangeInput,
        rows,
        totalCount,
        isLoading
    }

}