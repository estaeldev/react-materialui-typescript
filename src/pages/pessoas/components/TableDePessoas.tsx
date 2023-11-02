import { LinearProgress, Pagination, Paper, Table, TableCell, TableContainer, TableFooter, TableRow } from "@mui/material";
import { FC, ReactNode } from "react";
import { Environment } from "../../../shared/environments";

interface ITableDePessoasProps {
    totalCount?: number
    page?: number
    isLoading?: boolean
    setPage?: (newPage: number) => void
    children?: ReactNode | ReactNode[]
}

export const TableDePessoas: FC<ITableDePessoasProps> = ({
    children, totalCount, page, setPage, isLoading
}) => {


    return (
        <TableContainer component={Paper} variant="outlined" sx={{m: 1, width: "auto"}}>
            <Table>

                {children}

                <TableFooter>
                    {totalCount !== undefined && totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHA && (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Pagination 
                                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHA)} 
                                    page={page}
                                    onChange={(_, newPage) => setPage?.(newPage)}
                                    color="primary"
                                />
                            </TableCell>
                        </TableRow>
                    )}

                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={4} sx={{p: 0}}>
                                <LinearProgress variant="indeterminate" />
                            </TableCell>
                        </TableRow>
                    )}
                </TableFooter>

                {totalCount === 0 && !isLoading && (
                    <caption>{Environment.LISTAGEM_VAZIA}</caption>
                )}

            </Table>
        </TableContainer>
    )

}