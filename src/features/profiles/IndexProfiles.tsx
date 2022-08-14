import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProfileConnection, selectProfiles } from "./profileActions";
import ProfileRow from "./ProfileRow";
import { RedirectToAdd } from "./RedirectToAdd";

export const IndexProfiles = () => {
  const profilesState = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initConnection = async () => {
      const connection = await getProfileConnection(dispatch);
      connection.invoke("GetProfiles");
    };

    initConnection();
  }, [dispatch]);

  return (
    <>
      <RedirectToAdd />
      <hr />
      {profilesState.profiles.map((profile) => {
        return <ProfileRow key={profile.id} {...profile} />;
      })}
    </>
  );
};
