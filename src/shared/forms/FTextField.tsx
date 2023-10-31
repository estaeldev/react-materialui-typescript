import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { FC, useEffect, useRef } from "react";

type IFTextFieldProps = {
    nome: string 
} & TextFieldProps

export const FTextField: FC<IFTextFieldProps> = ({nome, ...rest}) => {
    
    const {fieldName, registerField, defaultValue, error, clearError} = useField(nome)
    const textFieldRef = useRef<HTMLInputElement>(null)
    
    useEffect(() => {
        registerField({
            name: fieldName, 
            ref: textFieldRef.current,
            path: "value"
        })

    }, [fieldName, registerField])

    return (
        <TextField {...rest} 
            inputRef={textFieldRef}
            defaultValue={defaultValue}
            error={!!error}
            helperText={error}
            onKeyDown={(event) => {error && clearError(); rest.onKeyDown?.(event)}}
            
        />
    )

}
