import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { FC, useEffect, useState } from "react";
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
        CidadesService.getAll(1, busca).then(result => {
            setIsLoading(false)
            if(result instanceof Error) {
                alert(result.message)
                return
            }
            setOptions(result.data.map(cidade => ({id: cidade.id, label: cidade.nome})))
        })
    }, [busca])
    
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
            /> 
        )} 
        />
    )
}
