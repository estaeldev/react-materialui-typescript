import { DarkMode, LightMode } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CircularProgress, LinearProgress, TextField, Typography } from "@mui/material";
import { FC, ReactNode, useRef, useState } from "react";
import * as Yup from "yup";
import { useAuthContext, useThemeContext } from "../../shared/hooks";

type TLoginYupSchema = {
    email: string
    password: string
}

const loginSchema: Yup.Schema<TLoginYupSchema> = Yup.object().shape({
    email: 
        Yup
        .string()
        .required("O campo é obrigatório")
        .email("O campo deve conter um email válido"),
    password: 
        Yup
        .string()
        .required("O campo é obrigatório")
})

type TLoginProps = {
    children?: ReactNode
}

export const Login: FC<TLoginProps> = ({children}) => {

    const {isAuthenticate, login} = useAuthContext()
    const inputEmailRef = useRef<HTMLInputElement>()
    const inputSenhaRef = useRef<HTMLInputElement>()
    const [emailError, setEmailError] = useState<string>()
    const [senhaError, setSenhaError] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)
    const {toggleTheme, themeName} = useThemeContext()

    const handleLogin = async () => {
        setIsLoading(true)
        const email = inputEmailRef.current?.value
        const senha = inputSenhaRef.current?.value

        loginSchema.validate({email: email, password: senha}, {abortEarly: false}).then(result => {
            login(result.email, result.password).then(() => setIsLoading(false))

        }).catch((error: Yup.ValidationError) => {
            setIsLoading(false)
            error.inner.forEach(error => {
                if(error.path === "email") {
                    setEmailError(error.message)
                } else if(error.path === "password") {
                    setSenhaError(error.message)
                }
            })

        })

    }

    if(isAuthenticate) {
        return (
            <>
                {children}
            </>
        )
    }
    
    return (
        <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
            
            <Box position="fixed" top={0} right={0} padding={2}>
                 <Button 
                    variant="contained" 
                    color="inherit"
                    onClick={toggleTheme} 
                    disabled={isLoading}
                    endIcon={themeName ===  "light" ? <DarkMode /> : <LightMode />}
                >
                    {themeName === "dark" ? "Tema Claro" : "Tema Escuro"}
                </Button>
            </Box>

            <Card>
                <CardContent>
                    <Box display="flex" flexDirection="column" gap={2} width={300}>
                        <Typography variant="h6" align="center">Identifica-se</Typography>

                        {isLoading && (
                            <LinearProgress variant="indeterminate" />
                        )}

                        <TextField 
                            fullWidth
                            label="Email"
                            type="email"
                            disabled={isLoading}
                            inputRef={inputEmailRef}
                            error={!!emailError}
                            helperText={emailError}
                            onKeyDown={() => emailError && setEmailError(undefined)}
                        />
                        <TextField 
                            fullWidth
                            label="Senha"
                            type="password"
                            disabled={isLoading}
                            inputRef={inputSenhaRef}
                            error={!!senhaError}
                            helperText={senhaError}
                            onKeyDown={() => senhaError && setSenhaError(undefined)}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box width="100%" display="flex" justifyContent="center">
                        <Button 
                            variant="contained" 
                            onClick={handleLogin} 
                            disabled={isLoading}
                            endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" /> : undefined}
                        >
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>

        </Box>
        
    )

}
