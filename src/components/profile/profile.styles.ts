import styled, { css } from 'styled-components';

interface ProfileCardProps {
  value: string;
}

export const ProfileCard = styled.li<ProfileCardProps>`
  background-color: ${(props) => props.theme.palette[props.value]};
  color: ${(props) => props.theme.complement[props.value]};
  list-style: none;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
`;

export const ProfileTile = styled.div<ProfileCardProps>`
  display: flex;
  flex: 1;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProfileImage = styled.div`
  display: flex;
  flex: 1;
  width: 200px;
  height: 200px;
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
