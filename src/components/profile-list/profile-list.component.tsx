import React, { useEffect, useState } from 'react';
import { fetchProfiles, Profile } from '../../utils/fetchProfiles';
import PaginationComponent from '../pagination/pagination.component';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileList } from './profile-list.styles';

export function ProfileListComponent() {
  const [profilesList, updateProfilesList] = useState<Profile[] | undefined>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(10);
  // Get current profiles
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profilesList?.slice(
    indexOfFirstProfile,
    indexOfLastProfile
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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <h2>Profile List</h2>
      <ProfileList>
        {' '}
        {!currentProfiles?.length
          ? 'no profiles found'
          : currentProfiles
              .filter((profile, idx) => idx < 20)
              .map((profile: Profile) => (
                <ProfileComponent key={profile.uuid} {...profile} />
              ))}
      </ProfileList>
      <PaginationComponent
        currentPage={currentPage}
        profilesPerPage={profilesPerPage}
        totalProfiles={profilesList?.length}
        paginate={paginate}
      />
    </>
  );
}

export default ProfileListComponent;
