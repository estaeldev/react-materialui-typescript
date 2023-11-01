import { Icon, IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { IListagemCidades } from "../../../shared/interfaces";

interface ITBodyProps {
    listData: IListagemCidades[]
    iconDelete?: string
    iconEdit?: string
    handleDelete: (id: number) => void
    handleEdit: (id: number) => void
}

export const TBody: FC<ITBodyProps> = ({
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
                    <TableCell>{row.nome}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    )

}