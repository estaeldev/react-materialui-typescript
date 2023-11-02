import { Box, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBase } from "../../shared/layouts"
import { CidadesService, PessoasService } from "../../shared/services"

export const Dashboard: FC = () => {

    const [isLoadingCidades, setIsLoadingCidades] = useState(false)
    const [isLoadingPessoas, setIsLoadingPessoas] = useState(false)
    const [totalCidades, setTotalCidades] = useState(0)
    const [totalPessoas, setTotalPessoas] = useState(0)
    
    useEffect(() => {
        setIsLoadingCidades(true)
        CidadesService.getAll(1).then(result => {
            setIsLoadingCidades(false)

            if(result instanceof Error) {
                alert(result.message)
                return
            }

            setTotalCidades(result.totalCount)

        })
        
        setIsLoadingPessoas(true)
        PessoasService.getAll(1).then(result => {
            setIsLoadingPessoas(false)
            if(result instanceof Error) {
                alert(result.message)
                return
            }

            setTotalPessoas(result.totalCount)
        })
            

    }, [])

    return (
        <LayoutBase titulo="Página Inicial">

            <FerramentasDaListagem />

            <Box width="100%" display="flex">
                <Grid container direction="column" margin={2}>

                    <Grid container item direction="row" spacing={2}> 
                        <Grid item xs={12} md={6} xl={4}> 
                            <Card >
                                <CardContent>
                                    {isLoadingPessoas ? (
                                        <Box display="flex" gap={1}>
                                            <CircularProgress />
                                            <Typography variant="h4" align="center">
                                                Carregando...
                                            </Typography>
                                         </Box>
                                        ) : (
                                        <>
                                            <Typography variant="h4" align="center">
                                                Total de Pessoas
                                            </Typography>
                                            <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                                <Typography variant="h1">{totalPessoas}</Typography>
                                            </Box>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} xl={4}> 
                            <Card>
                                <CardContent>
                                    {isLoadingCidades ? (
                                        <Box display="flex" gap={1}>
                                            <CircularProgress />
                                            <Typography variant="h4" align="center">
                                                Carregando...
                                            </Typography>
                                        </Box>
                                        ) : (
                                        <>
                                            <Typography variant="h4" align="center">Total de Cidades</Typography>
                                            <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                                <Typography variant="h1">{totalCidades}</Typography>
                                            </Box>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>

        </LayoutBase>
    )

}
