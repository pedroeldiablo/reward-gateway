import React from 'react';
import { ProfileImage } from '../../utils/fetchProfiles';
import useImage, { Status } from '../../hooks/useImage';
import fallback from '../../assets/images/user-profile.svg';
import { ProfilePicture } from './profile-picture.styles';

export function ProfilePictureComponent({
  avatar,
  title,
  height,
  width,
}: ProfileImage) {
  const [status, image] = useImage(avatar, height, width);

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
    <ProfilePicture
      src={source ? source : fallback}
      alt={`Profile of ${title}`}
    />
  );
}
