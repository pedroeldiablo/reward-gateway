import styled, { css } from 'styled-components';

interface DropdownProps {
  open: boolean;
  value: string;
}

export const DropdownList = styled.div<DropdownProps>`
  display: ${(props) => (props.open ? 'flex' : 'none')};
  background-color: ${(props) => props.theme.complement[props.value]};
  color: ${(props) => props.theme.palette[props.value]};
  flex-direction: column;
  padding: 0 0.5rem 0.5rem 0.5rem;
  /* border: 1px solid ${(props) => props.theme.palette[props.value]}; */
`;

interface DropdownListItemsProps {
  key: string;
  value: string;
}

export const DropdownListItems = styled.div<DropdownListItemsProps>`
  background-color: ${(props) => props.theme.palette[props.value]};
  color: ${(props) => props.theme.complement[props.value]};
  border: 1px solid ${(props) => props.theme.palette.brandWhite};
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export const DropdownSelectedListItems = styled.div<DropdownListItemsProps>`
  background-color: ${(props) => props.theme.palette[props.value]};
  color: ${(props) => props.theme.complement[props.value]};
  border: 1px solid ${(props) => props.theme.palette.brandWhite};
  padding: 0.5rem;
  margin: 0.5rem;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

interface DropdownHeaderProps {
  open: boolean;
  color: string;
}

export const DropdownHeader = styled.label<DropdownHeaderProps>`
  background-color: ${(props) => props.theme.complement[props.color]};
  color: ${(props) => props.theme.palette[props.color]};
  display: flex;
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;
