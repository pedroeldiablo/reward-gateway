import React, { useContext, useEffect, useMemo, useState } from 'react';
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

  // TODO enable user to select search against other fields
  const filteredProfiles = profilesList?.filter((profile, idx) =>
    profile.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  // console.log(filteredProfiles);

  const [profilesPerPage] = useState(10);
  // Get current profiles
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles?.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const { user, state } = useContext(UserPreferencesContext);

  // const myArrayFiltered = useMemo(
  //   () =>
  //     profilesList?.filter((el) => {
  //       const what = state?.filter((s) => {
  //         console.log(s.id, el.uuid);
  //         console.log('these are: ', s.id === el.uuid);
  //         return s.id === el.uuid;
  //       });
  //       console.log(false);
  //       return false;
  //     }),
  //   [profilesList, state]
  // );

  // el.uuid === 'bob'
  // let matched = state?.filter((f) => {
  //   if (f.id === el.uuid) return el;
  //   return null;
  // });
  // return matched;
  // return el.uuid === 'a89dc244-073c-33e7-925a-17ca23f7d9f0';
  // return state?.filter((f) => {
  //   if (f.id === el.uuid) return el;
  //   return null;
  // });

  // console.log('state', state);
  // console.log('myArrayFiltered', myArrayFiltered);

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
          : currentProfiles.map((profile: Profile) => (
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
