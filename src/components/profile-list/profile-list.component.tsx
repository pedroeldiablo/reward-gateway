import React, { useEffect, useState } from 'react';
import { fetchProfiles, Profile } from '../../utils/fetchProfiles';

export function ProfileList() {
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
        // const dataLoad = await http<Post[]>(
        //   'https://jsonplaceholder.typicode.com/photos'
        // );

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
      <div>
        {' '}
        {!profilesList?.length
          ? 'no posts found'
          : profilesList
              .filter((profile, idx) => idx < 4)
              .map((profile: Profile) => (
                <p key={profile.uuid}> {profile.title}</p>
              ))}
      </div>
    </>
  );
}

export default ProfileList;
