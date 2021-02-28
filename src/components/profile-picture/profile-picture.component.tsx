import React from 'react';
import { ProfileImage } from '../../utils/fetchProfiles';
import useImage, { Status } from '../../hooks/useImage';
import fallback from '../../assets/images/user-profile.svg';

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
    console.log({ image });
    source = image.currentSrc;
  }

  return <img src={source ? source : fallback} alt={`Profile of ${title}`} />;
}
