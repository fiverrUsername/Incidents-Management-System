import { styled } from "styled-components";

export const SingleAttachment = styled.div`
  flex:1;
  display:flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const StyledImage = styled.img`
  flex:1;
  width:100%;
  max-height:180px;
  height: 180px; 
  max-width: 100%; 
  max-height: 100%; 
  max-height: 228px;
  border-radius: 20px;
  object-fit: contain;
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
  max-height: 228px;
  border-radius: 20px;
  object-fit: contain;
  /* Add any additional styling here */
  padding: 10px;
`;



