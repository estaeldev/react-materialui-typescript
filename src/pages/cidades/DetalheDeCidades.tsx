import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material"
import { Form } from "@unform/web"
import { FC, useEffect } from "react"
import { FerramentasDeDetalhe } from "../../shared/components"
import { FerramentasDeDetalheButton } from "../../shared/components/ferramentas-de-detalhe/components"
import { FTextField } from "../../shared/forms"
import { useDetalheDeCidades } from "../../shared/hooks/useDetalheDeCidades"
import { LayoutBase } from "../../shared/layouts"


export const DetalheDeCidades: FC = () => {

    const {
        id,
        nome, 
        isLoading, 
        formRef,
        setNome,
        handleButtonDelete,
        handleButtonNova,
        handleButtonSalvar,
        handleButtonSalvarEFecha,
        handleButtonVoltar,
        handleButtonSalvarENovo,
        handleSave,
        carregarPagina
    } = useDetalheDeCidades()
    
    useEffect(() => {
        carregarPagina()

    }, [carregarPagina])
    
    return (
        <LayoutBase titulo={isLoading ? "Carregando..." : id === "nova" ? "Nova Cidade" :  nome}>
            
            <FerramentasDeDetalhe>
                <FerramentasDeDetalheButton  
                    label="SALVAR" 
                    iconName="save" 
                    variant="contained"
                    handleClick={handleButtonSalvar} 
                />
                <FerramentasDeDetalheButton  
                    label="SALVAR E FECHAR" 
                    iconName="save" 
                    handleClick={handleButtonSalvarEFecha}
                />
                {id !== "nova" && (
                    <FerramentasDeDetalheButton  
                       label="SALVAR E NOVA" 
                       iconName="save" 
                       handleClick={handleButtonSalvarENovo}
                   />
                )}
                {id !== "nova" && (
                    <FerramentasDeDetalheButton  
                        label="APAGAR" 
                        iconName="delete" 
                        startDivider
                        handleClick={() => handleButtonDelete(Number(id))}
                    />
                )}
                {id !== "nova" && (
                    <FerramentasDeDetalheButton  
                        label="NOVA" 
                        iconName="add" 
                        handleClick={handleButtonNova}
                    />
                )}

                <FerramentasDeDetalheButton  
                    label="VOLTAR" 
                    iconName="arrow_back" 
                    startDivider
                    handleClick={handleButtonVoltar}
                />
            </FerramentasDeDetalhe>
            

            <Form onSubmit={handleSave} ref={formRef}>

                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
                    <Grid container direction="column" padding={2} spacing={2}>

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant="indeterminate" />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid container item direction="row" spacing={1}>
                            <Grid item xs={12} md={5}>
                                <FTextField 
                                    fullWidth 
                                    label="Nome" 
                                    nome="nome" 
                                    disabled={isLoading} 
                                    onChange={event => id !== "nova" ? setNome(event.target.value) : undefined}
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
                
            </Form>
            

            
        </LayoutBase>
    )

}
