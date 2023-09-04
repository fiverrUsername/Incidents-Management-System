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
    @media (max-width: 480px) {
      overflow-y: auto;
      overflow-x: auto;
    }
    
    @media (max-width: 768px) {
      overflow-y: auto;
      overflow-x: unset;
    }

  
`;
export const StyledPaper = styled(Paper)`
border-radius: 20px;
border: 1px solid #bfbfbf;
background: #fff;
padding: 20px;
margin-top: 2%;

@media (max-width: 480px) {
  padding: 10px;
  font-size: 60%
}

@media (max-width: 768px) {
  padding: 10px;
  font-size: 70%
}
`;
export const StyledBox = styled(Box)`
 color: ${theme.palette.secondary.main};
 font-weight: ${theme.typography.bold.fontWeight};
 margin: 2%

 @media (max-width: 480px) {
  font-size: 60%
  margin: 1%;
}

@media (max-width: 768px) {
  padding: 10px;
  font-size: 60%
}
`;
 

