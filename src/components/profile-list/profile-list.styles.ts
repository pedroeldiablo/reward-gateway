import styled, { css } from 'styled-components';

export const ProfileList = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;
