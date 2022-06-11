import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllProfiles, selectProfiles } from "./profileActions";
import { RedirectToAdd } from "./RedirectToAdd";

export const IndexProfiles = () => {
  const profilesState = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  return (
    <>
      <RedirectToAdd />
      {profilesState.profiles.map((profile) => {
        return <div key={profile.email}>{profile.email}</div>;
      })}
    </>
  );
};
