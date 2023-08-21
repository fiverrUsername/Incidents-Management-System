import { styled } from "styled-components";

export const SingleAttachment = styled.div`
align-items: center;
justify-content: center;
background-size: cover;
background-position: center;
background-repeat: no-repeat;


  flex:1;
  display:flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const StyledImage = styled.img`
  flex:1;
  border-radius: 10px;
  object-fit: cover;
  width:100%;
`;
export const StyledLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    color: #007bff;
  }
`;
export const StyledFilePreview = styled.div`
  flex: 1;
  height: 180px; 
  max-width: 100%; 
  max-height: 100%; 
  object-fit: contain;
  border-radius: 20px;
  /* Add any additional styling here */
  padding: 10px;
`;


