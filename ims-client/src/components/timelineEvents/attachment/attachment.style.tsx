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
  width:100%;
`;
export const StyledImage = styled.img`
  flex:1;
  border-radius: 10px;
  object-fit: cover;
  object-position:bottom;
  height:inherit;
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
  width: 100%; 
  max-height: 100%; 
  object-fit: contain;
  border-radius: 20px;
  /* Add any additional styling here */
  padding: 10px;

  @media (max-width: 320px) {
    flex: 1;
    height: 65px;
    width: 85px;
    max-height: 100%;
    object-fit: contain;
    border-radius: 20px;
    padding: 10px;
  }

  @media (max-width: 420px) {
    flex: 1;
    height: 65px;
    width: 85px;
    max-height: 100%;
    object-fit: contain;
    border-radius: 20px;
    padding: 10px;
  }
  
  @media (max-width: 768px) {
    flex: 1;
    height: 87%;
    width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 20px;
    padding: 10px;
  }

`;


