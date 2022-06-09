import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllProfilesAsync, selectProfiles } from "./profileSlice";

export const IndexProfiles = () => {
  const profiles = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProfilesAsync());
  }, [dispatch]);

  return (
    <>
      {profiles.map((profile) => {
        return <div>{profile.email}</div>;
      })}
    </>
  );
};
