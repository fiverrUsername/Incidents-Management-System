import styled from "styled-components";
import theme from "../../theme";
import { Paper } from "@mui/material";
// import Search from "../../components/Search/Search";
export const CustomScrollbar = styled.div`
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;

  /* Works on Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 9px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.palette.secondary.main};
    border-radius: 5px;
    border: none;

  }
`;
export const StyledPaper = styled(Paper)`
border-radius: 20px;
border: 1px solid #bfbfbf;
background: #fff;
padding: 20px;
margin-top: 2%; /* Added margin-bottom for spacing */
// margin-right:2%;
// margin-left:2%;
`;
// export const StyledSearch = styled(Search)`
// .Paper{
//     border-radius: 250px;
//     border: 1px solid #E1E1E1;
//     background: #FFF;
// }
// `;
