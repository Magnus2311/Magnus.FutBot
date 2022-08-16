import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  onProfileRefreshRequested,
  onProfilesRequests,
  selectProfiles,
} from "./profileActions";
import ProfileRow from "./ProfileRow";
import { RedirectToAdd } from "./RedirectToAdd";

export const IndexProfiles = () => {
  const profilesState = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onProfilesRequests());
  }, [dispatch]);

  const onProfileRefresh = (profileId: string) => {
    dispatch(onProfileRefreshRequested(profileId));
  };

  return (
    <>
      <RedirectToAdd />
      <hr />
      {profilesState.profiles.map((profile) => {
        return (
          <ProfileRow
            key={profile.id}
            profile={profile}
            onRefresh={onProfileRefresh}
          />
        );
      })}
    </>
  );
};
