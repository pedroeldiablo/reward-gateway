import React, { useEffect, useState } from 'react';
import { fetchProfiles, Profile } from '../../utils/fetchProfiles';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileList } from './profile-list.styles';

export function ProfileListComponent() {
  const [profilesList, updateProfilesList] = useState<Profile[] | undefined>(
    []
  );
  useEffect(() => {
    // Basic implementation to handle race conditions
    // When component might unmount before API call finishes
    // https://overreacted.io/a-complete-guide-to-useeffect/#speaking-of-race-conditions
    let isStopped = false;

    if (!isStopped) {
      // Create an scoped async function in the hook
      async function scopedLoad() {
        const profiles: Profile[] = await fetchProfiles();
        if (!isStopped && profiles) {
          updateProfilesList(profiles);
        }
      }

      // Execute the created function directly
      scopedLoad();
    }
    return () => {
      isStopped = true;
    };
  }, []);

  return (
    <>
      <div>Profile List</div>
      <ProfileList>
        {' '}
        {!profilesList?.length
          ? 'no posts found'
          : profilesList
              .filter((profile, idx) => idx < 20)
              .map((profile: Profile) => (
                <ProfileComponent key={profile.uuid} {...profile} />
              ))}
      </ProfileList>
    </>
  );
}

export default ProfileListComponent;
