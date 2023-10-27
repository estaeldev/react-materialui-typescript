import { TableCell, TableHead, TableRow } from "@mui/material";
import { FC } from "react";

interface ITableDePessoasHeadProps {
    listHeads: string[]  
}

export const TableDePessoasHead: FC<ITableDePessoasHeadProps> = ({listHeads}) => {

    return (
        <TableHead>
            <TableRow>
                {listHeads.map((head) => (
                    <TableCell key={`u${Math.random() * 100}${head}`}>{head}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )

}
