import { TableCell, TableHead, TableRow } from "@mui/material";
import { FC } from "react";

interface ITHeadProps {
    listHeads: string[]  
}

export const THead: FC<ITHeadProps> = ({listHeads}) => {

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
