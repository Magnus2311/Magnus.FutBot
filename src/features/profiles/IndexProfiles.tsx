import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RedirectToAdd } from "./RedirectToAdd";
import { getAllProfilesAsync, selectProfiles } from "./profileSlice";

export const IndexProfiles = () => {
  const profiles = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProfilesAsync());
  }, [dispatch]);

  return (
    <>
      <RedirectToAdd />
      {profiles.map((profile) => {
        return <div key={profile.email}>{profile.email}</div>;
      })}
    </>
  );
};
