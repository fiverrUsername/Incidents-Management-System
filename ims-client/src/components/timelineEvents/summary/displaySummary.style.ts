import styled from "styled-components";
import theme from "../../../theme";
import { Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
 

export const StyleLabel = styled.label`
   
color: ${theme.palette.primary.dark};
font-size: ${theme.typography.fontSize};

@media (max-width: 480px) {
    font-size: 76%
  }

  @media (max-width: 820px) {
    font-size: 76%
  }
`;

export const StyledPaper = styled(Paper)`
border-radius: 20px;
border: 1px solid #bfbfbf;
background: #fff;
padding: 20px;
margin-top: 2%;

@media (min-width: 480px) {
  padding: 10px;
  font-size: 83%
  display: flex;
  flex-direction: column;
}

@media (max-width: 820px) {
  padding: 10px;
  font-size: 83%
}
`;
export const StyledBox = styled(Box)`
 color: ${theme.palette.secondary.main};
 font-weight: ${theme.typography.bold.fontWeight};
 margin: 2%

 @media (min-width: 480px) {
  font-size: 83%
  margin: 1%;
}

@media (max-width: 820px) {
    padding: 1%;
    font-size: 83%
    width: 143%;
    margin-left: 6px;
}
`;
 

export const styleGrid = styled(Grid)`
display: flex;
flex-direction: row;
-webkit-box-pack: center;
justify-content: center;
align-items: flex-start;
flex-wrap: nowrap;
`;