import React, { useContext, useEffect, useState } from 'react';
import { UserPreferencesContext } from '../../context/userPreferencesContext';
import { fetchProfiles, Profile } from '../../utils/fetchProfiles';
import PaginationComponent from '../pagination/pagination.component';
import { ProfileComponent } from '../profile/profile.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ProfileList, ProfileTitle } from './profile-list.styles';

export function ProfileListComponent() {
  const [profilesList, updateProfilesList] = useState<Profile[] | undefined>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const filteredProfiles = profilesList?.filter((profile, idx) =>
    profile.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  console.log(filteredProfiles);

  const [profilesPerPage] = useState(10);
  // Get current profiles
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles?.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const { user } = useContext(UserPreferencesContext);

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
      <SearchBarComponent
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
      />
      <ProfileTitle>{user} Profile List</ProfileTitle>
      <ProfileList>
        {' '}
        {!currentProfiles?.length
          ? 'no profiles found'
          : currentProfiles
              .filter((profile, idx) => profile.title.includes(searchValue))
              .map((profile: Profile) => (
                <ProfileComponent key={profile.uuid} {...profile} />
              ))}
      </ProfileList>
      <PaginationComponent
        currentPage={currentPage}
        profilesPerPage={profilesPerPage}
        totalProfiles={filteredProfiles?.length}
        paginate={paginate}
      />
    </>
  );
}

export default ProfileListComponent;
