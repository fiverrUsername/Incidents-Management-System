import styled from "styled-components";
import theme from "../../theme";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";

export const CustomScrollbar = styled.div`
  // max-height: 400px;
  max-height:300px;
  overflow-y: auto;
  scrollbar-color-x:${theme.palette.info.main};
  scrollbar-width: thin;
  

  /* Works on Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 9px;
    background-color: ${theme.palette.info.main};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.palette.secondary.main};
    border-radius: 5px;
    border: none;
    // scrollbar-hight: 400px;

  }
`;
export const StyledPaper = styled(Paper)`
border-radius: 20px;
border: 1px solid #bfbfbf;
background: #fff;
padding: 20px;
margin-top: 2%;

@media (max-width: 600px) {
  padding: 10px;
}
`;
export const StyledBox = styled(Box)`
 color: ${theme.palette.secondary.main};
 font-weight: ${theme.typography.bold.fontWeight};
 margin: 2%

 @media (max-width: 600px) {
  font-size: 16px;
  margin: 1%;
}
`;
 

