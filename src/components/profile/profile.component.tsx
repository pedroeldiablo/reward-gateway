import React, { useState } from 'react';
import { useViewport } from '../../context/viewPortContext';
import { Profile } from '../../utils/fetchProfiles';
import { ModalComponent } from '../modal/modal-component';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
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

  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const width = 300;
  const height = 300;

  return (
    <>
      <ProfileTile key={uuid}>
        <ProfileImage onClick={() => setSelectedImg(avatar)}>
          <ProfilePictureComponent
            title={title}
            avatar={avatar}
            height={height}
            width={width}
          />
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
      {selectedImg && (
        <ModalComponent
          title={title}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
        />
      )}
    </>
  );
}

export default ProfileComponent;

//   uuid: string;
//   company: string;
//   bio: string;
//   title: string;
//   avatar: string;
