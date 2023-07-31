import { Chip, styled } from "@mui/material";
import theme from "../../theme";


export const StyledChip = styled(Chip)`
border: '1px solid'  + ${theme.palette.secondary.main},
color: ${theme.palette.secondary.main},
backgroundColor: ${theme.palette.secondary.light},
`;