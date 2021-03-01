import styled, { css } from 'styled-components';

export const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  max-width: 600px;
  overflow-x: hidden;
  margin: 0 auto;
  text-align: center;
`;

export const PaginationList = styled.ul`
  padding-inline-start: 0;
  display: flex;
  flex: 1;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
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
    width: 100%;
    padding: 1rem;
    text-decoration: none;
  }
`;
