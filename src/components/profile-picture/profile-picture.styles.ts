import styled, { css } from 'styled-components';

interface ProfileCardProps {
  src: string;
  alt: string;
}

export const ProfilePicture = styled.img<ProfileCardProps>`
  background-color: ${(props) => props.theme.palette.brandWhite};
`;
