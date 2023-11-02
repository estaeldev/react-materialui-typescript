import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { FC, useEffect, useState } from "react";

type IFTextFieldProps = {
    nome: string 
} & TextFieldProps

export const FTextField: FC<IFTextFieldProps> = ({nome, ...rest}) => {
    
    const {fieldName, registerField, defaultValue, error, clearError} = useField(nome)
    const [textFieldNome, setTextFieldNome] = useState("")
    
    useEffect(() => {
        registerField({
            name: fieldName, 
            getValue: () => textFieldNome,
            setValue: (_, newValue) => setTextFieldNome(newValue)
        })

    }, [fieldName, registerField, textFieldNome])

    return (
        <TextField {...rest} 
            value={textFieldNome}
            onChange={(event) => {setTextFieldNome(event.target.value); rest.onChange?.(event)}}
            defaultValue={defaultValue}
            error={!!error}
            helperText={error}
            onKeyDown={(event) => {error && clearError(); rest.onKeyDown?.(event)}}
            
        />
    )

}
