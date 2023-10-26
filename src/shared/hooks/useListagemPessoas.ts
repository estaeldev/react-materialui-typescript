import { useCallback, useRef, useState } from "react"
import { PessoasService } from "../services"

    
export const useListagemPessoas = () => {

    const [page, setPage] = useState<number>(1)

    const inputBuscaRef = useRef<HTMLInputElement>(null)

    const carregarTodasPessoas = useCallback((filter?: string) => {
        PessoasService.getAll(page, filter).then(result => {
            if(result instanceof Error) {
                alert(result.message)
                return
            }
            console.log(result)
        })
    }, [page])

    const handleClickBusca = useCallback(() => {
        const value = inputBuscaRef.current?.value
        if(value) {
            carregarTodasPessoas(value)
            return
        }
        carregarTodasPessoas()
    
    }, [carregarTodasPessoas])

    const handleOnchangeInput = useCallback(() => {
        const value = inputBuscaRef.current?.value
        if(!value) {
            carregarTodasPessoas()
        }
    }, [carregarTodasPessoas])

    return {inputBuscaRef, handleClickBusca, carregarTodasPessoas, setPage, handleOnchangeInput}

}