import styled, { css } from 'styled-components';

export const Modal = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  /* object-fit: contain; */
  img {
    object-fit: contain;
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    /* margin: 60px auto; */
    box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.5);
    border: 3px solid white;
    background-color: #ffffff;
  }
`;
