import styled, { css } from 'styled-components';

export const PaginationNav = styled.nav`
  display: flex;
  flex: 1;
  max-width: 90vw;
  overflow-x: scroll;
`;

export const PaginationList = styled.ul`
  display: flex;
  flex: 1;
`;

export const PaginationLink = styled.li`
  width: 10%;
  border: 1px solid gray;
  display: flex;
  flex: 1;
  &:hover {
    background-color: #ddd;
  }
  a {
    padding: 1rem;
    text-decoration: none;
  }
`;
