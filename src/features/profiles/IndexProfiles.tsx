import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProfiles, setupEventsHub } from "./profileActions";
import ProfileRow from "./ProfileRow";
import { RedirectToAdd } from "./RedirectToAdd";

export const IndexProfiles = () => {
  const profilesState = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setupEventsHub(dispatch).then(connection => {
      connection.invoke("GetProfiles");
    });
  }, [dispatch]);

  return (
    <>
      <RedirectToAdd />
      {profilesState.profiles.map(profile => {
        return <ProfileRow {...profile} />;
      })}
    </>
  );
};
