import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { FC, useEffect, useState } from "react";

type IFTextFieldProps = {
    nome: string 
} & TextFieldProps

export const FTextField: FC<IFTextFieldProps> = ({nome, ...rest}) => {
    
    const {fieldName, registerField, defaultValue, error, clearError} = useField(nome)
    const [value, setValue] = useState(defaultValue || "")

    useEffect(() => {
        registerField({
            name: fieldName, 
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue)
        })

    }, [registerField, fieldName, value])

    return (
        <TextField {...rest} 
            value={value}
            onChange={(event) => setValue(event.target.value)}
            defaultValue={defaultValue}
            error={!!error}
            helperText={error}
            onKeyDown={() => error ? clearError() : undefined}
        />
    )

}
