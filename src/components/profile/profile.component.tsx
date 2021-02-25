import React from 'react';
import { Profile } from '../../utils/fetchProfiles';
import { ProfilePictureComponent } from '../profile-picture/profile-picture';
import { ProfileDetails, ProfileImage, ProfileTile } from './profile.styles';

export function ProfileComponent({
  uuid,
  company,
  bio,
  title,
  avatar,
}: Profile) {
  const removeMarkUp = (inputString: string): string =>
    inputString
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()
      .replace('alert(1);', '');
  title = removeMarkUp(title);
  company = removeMarkUp(company);
  bio = removeMarkUp(bio);

  return (
    <ProfileTile key={uuid}>
      <ProfileImage>
        <ProfilePictureComponent title={title} avatar={avatar} />
        {/* <img
          src={
            avatar
              ? avatar
              : `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3C/svg%3E`
          }
          alt={`Profile of ${title}`}
        /> */}
      </ProfileImage>
      <ProfileDetails>
        <p>
          Name
          {company}
        </p>
        <p>Profession {title}</p>
        <p>{bio}</p>
      </ProfileDetails>
    </ProfileTile>
  );
}

export default ProfileComponent;

//   uuid: string;
//   company: string;
//   bio: string;
//   title: string;
//   avatar: string;
