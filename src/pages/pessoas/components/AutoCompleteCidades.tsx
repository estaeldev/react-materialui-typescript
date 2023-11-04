import { Autocomplete, CircularProgress, Pagination, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { FC, useEffect, useState } from "react";
import { Environment } from "../../../shared/environments";
import { CidadesService } from "../../../shared/services";

type TAutoCompleteOption = {
    id: number,
    label: string
}

type TAutoCompleteCidadesProps = {
    isExternalLoading?: boolean
}

export const AutoCompleteCidades: FC<TAutoCompleteCidadesProps> = ({isExternalLoading=false}) => {

    const {fieldName, registerField, defaultValue, error, clearError} = useField("cidadeId")
    const [options, setOptions] = useState<TAutoCompleteOption[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [busca, setBusca] = useState("")
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue)


    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId) 
        })
    }, [fieldName, registerField, selectedId])

    useEffect(() => {
        setIsLoading(true)
        CidadesService.getAll(page, busca, selectedId?.toString()).then(result => {
            setIsLoading(false)
            if(result instanceof Error) {
                alert(result.message)
                return
            }
            setOptions(result.data.map(cidade => ({id: cidade.id, label: cidade.nome})))
            setTotalCount(result.totalCount)
        })
    }, [busca, page, selectedId])
    
    return (
        <Autocomplete 
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem opções"
            loadingText="Carregando..."
            disablePortal
            value={selectedId ? options.find(opcao => opcao.id === selectedId) ?? null : null}
            options={options} 
            loading={isLoading}
            disabled={isExternalLoading}
            popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
            onChange={(_, newValue) => {setSelectedId(newValue?.id ?? undefined); }}
            onInputChange={(_, newValue) => {setBusca(newValue); error && clearError()}}
            renderInput={(params) => (
                <TextField {...params} 
                    label="Cidade" 
                    error={!!error} 
                    helperText={error} 
                    InputProps={!selectedId ? {...params.InputProps, startAdornment: (
                        <Pagination 
                            size="small"
                            count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHA)} 
                            page={page}
                            onChange={(_, newPage) => setPage?.(newPage)}
                        />
                    )} : {...params.InputProps}}
                /> 
            )} 
            
        />
    
    )
    
}
