import { Icon, IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { IListagemPessoas } from "../../../shared/interfaces";

interface ITableDePessoasBodyProps {
    listData: IListagemPessoas[]
    iconDelete?: string
    iconEdit?: string
    handleDelete: (id: number) => void
    handleEdit: (id: number) => void
}

export const TableDePessoasBody: FC<ITableDePessoasBodyProps> = ({
    listData, iconDelete="delete", iconEdit="edit", handleDelete, handleEdit
}) => {

    return (
        <TableBody>
            {listData.map(row => (
                <TableRow key={row.id}>
                    <TableCell>
                        <IconButton onClick={() => handleDelete(row.id)}>
                            <Icon>{iconDelete}</Icon>
                        </IconButton>
                        <IconButton onClick={() => handleEdit(row.id)}>
                            <Icon>{iconEdit}</Icon>
                        </IconButton>
                    </TableCell>
                    <TableCell>{row.nomeCompleto}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.cidadeId}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    )

}