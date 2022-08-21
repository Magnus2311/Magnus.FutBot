import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  onProfileRefreshRequested,
  onProfilesRequests,
  selectProfiles,
} from "./profileActions";

export const CurrentProfile = () => {
  const { profiles } = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();
  const { email } = useParams();
  const [currentProfile, setCurrentProfile] = useState(
    profiles.find((p) => p.email.toLowerCase() === email?.toLowerCase())
  );

  useEffect(() => {
    if (profiles.length === 0) {
      dispatch(onProfilesRequests());
    } else if (currentProfile) {
      dispatch(onProfileRefreshRequested(currentProfile.id));
    } else {
      setCurrentProfile(
        profiles.find((p) => p.email.toLowerCase() === email?.toLowerCase())
      );
    }
  }, [dispatch, profiles.length, currentProfile, email, profiles]);

  return (
    <div>
      <h4>Active: {currentProfile?.email}</h4>
      <div>Active Bids: {currentProfile?.activeBidsCount}</div>
      <div>Coins: {currentProfile?.coins}</div>
      <div>Outbidded: {currentProfile?.outbidded}</div>
      <div>Status: {currentProfile?.status}</div>
      <div>Transfer List: {currentProfile?.transferListCount}</div>
      <div>Unassigned: {currentProfile?.unassignedCount}</div>
      <div>Won Targets: {currentProfile?.wonTargetsCount}</div>
      {currentProfile?.tradePile.transferList
        .groupBy("name")
        .map((playerCard) => {
          return (
            <div>
              <div>{playerCard.name}</div>
              <div>{playerCard.playerCardStatus}</div>
              <div>{playerCard.playerType}</div>
              <div>{playerCard.rating}</div>
              <hr></hr>
            </div>
          );
        })}
    </div>
  );
};
