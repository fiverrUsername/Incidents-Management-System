import styled from "styled-components";
import theme from "../../theme";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
// import Search from "../../components/Search/Search";
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
`;
export const StyledBox = styled(Box)`
 color: ${theme.palette.secondary.main};
`;
 

// export const StyleBox = styled( Box)`
//    display: 'flex'
 
// `;
// export const StyledSearch = styled(Search)`
// .Paper{
//     border-radius: 250px;
//     border: 1px solid #E1E1E1;
//     background: #FFF;
// }
// `;
