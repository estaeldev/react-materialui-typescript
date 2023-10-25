import { Button, Divider, Icon, Skeleton, Typography } from "@mui/material";
import { FC } from "react";

interface IFerramentasDeDetalheProps {
    label: string
    iconName: string
    variant?: "contained" | "outlined"
    isCarregando?: boolean
    isEsconder?: boolean
    startDivider?: boolean
    handleClick?: () => void
}

export const FerramentasDeDetalheButton: FC<IFerramentasDeDetalheProps> = ({
    label="", iconName="", variant="outlined", handleClick, isCarregando=false, isEsconder=false, startDivider=false}) => {
    
    return (
        <>  
            {startDivider && (<Divider orientation="vertical" />)}

            {isEsconder ? (
                <></>
            ) : (
                isCarregando ? (
                    <Skeleton width={110} height={60} />
                ) : (
                    <Button
                        variant={variant}
                        color="primary"
                        startIcon={<Icon>{iconName}</Icon>}
                        onClick={() => handleClick?.()}
                    >
                        <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            {label}
                        </Typography>
                        
                    </Button>
                )
            )}
        </>
    )

}
