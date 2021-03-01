import React, { useContext, useState } from 'react';
import { useViewport } from '../../context/viewPortContext';
import { Profile } from '../../utils/fetchProfiles';
import { ModalComponent } from '../modal/modal.component';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import {
  ProfileCard,
  ProfileDetails,
  ProfileImage,
  ProfileTile,
} from './profile.styles';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { LabelsComponent } from '../labels/labels.component';
import { UserPreferencesContext } from '../../context/userPreferencesContext';

const dropdownOptions = [
  {
    label: 'Pale Grey',
    value: 'pale',
  },
  {
    label: 'Soft Pink',
    value: 'primary',
  },
  {
    label: 'Dark Grey',
    value: 'secondary',
  },
  {
    label: 'Salmon Pink',
    value: 'error',
  },
];

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
  const { state, dispatch } = useContext(UserPreferencesContext);
  // const [selectedDropdown, setSelectedDropdown] = useState(dropdownOptions[0]);
  // const [labels, setLabels] = useState<undefined | null | string>(undefined);

  // const { labels, setLabels } = useContext(UserPreferencesContext);

  // TODO set these dynamically based on presentation

  const profilePreference = state?.filter((obj) => {
    // console.log(obj.id);
    // console.log(obj.id === uuid);
    return obj.id === uuid;
  });

  let selectedDropdown: {
    label: string | undefined;
    value: string | undefined;
  } = dropdownOptions[0];

  !profilePreference?.length
    ? (selectedDropdown = dropdownOptions[0])
    : profilePreference.map((profile) => {
        if (profile.color) {
          return (selectedDropdown = {
            label: profile.colorLabel,
            value: profile.color,
          });
        }
        return (selectedDropdown = dropdownOptions[0]);
      });

  // if(profilePreference.color)

  // if (state!.filter((profile) => profile.id === uuid).length > 0) {

  const width = 300;
  const height = 300;

  return (
    <ProfileCard key={uuid} value={selectedDropdown.value as string}>
      <ProfileTile key={uuid} value={selectedDropdown.value as string}>
        <ProfileImage onClick={() => setSelectedImg(avatar)}>
          <ProfilePictureComponent
            title={title}
            avatar={avatar}
            height={height}
            width={width}
          />
        </ProfileImage>
        <ProfileDetails>
          <h3>Name {company}</h3>
          <h4>Profession {title}</h4>
          <p>Bio {bio}</p>
          <DropdownComponent
            label="Set colour"
            options={dropdownOptions}
            uuid={uuid}
            // selected={selectedDropdown}
            // onSelectedChange={setSelectedDropdown}
            color={selectedDropdown.value as string}
          />
          <LabelsComponent uuid={uuid} />
        </ProfileDetails>
      </ProfileTile>
      {selectedImg && (
        <ModalComponent
          title={title}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
        />
      )}
    </ProfileCard>
  );
}

export default ProfileComponent;

//   uuid: string;
//   company: string;
//   bio: string;
//   title: string;
//   avatar: string;
