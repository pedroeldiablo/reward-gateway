import React from 'react';
import { ProfileImage } from '../../utils/fetchProfiles';
import useImage, { Status } from '../../hooks/useImage';
import fallback from '../../assets/images/user-profile.svg';

export function ProfilePictureComponent({ avatar, title }: ProfileImage) {
  const [status, image] = useImage(avatar);

  if (status === Status.LOADING) {
    return <div className="spinner">Spinner</div>;
  }

  let source;
  if (status === Status.FAILED) {
    source = fallback;
  } else {
    source = image.currentSrc;
  }

  return (
    <>
      <p>WTF</p>
      <img src={source ? source : fallback} alt={`Profile of ${title}`} />
    </>
  );
}
