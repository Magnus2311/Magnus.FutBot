import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { groupBy } from "../../helpers/additionalFunctions";
import { CardImage } from "../common/CardImage";
import { onProfilesRequests, selectProfiles } from "./profileActions";

export const CurrentProfile = () => {
  const navigation = useNavigate();
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
      // dispatch(onProfileRefreshRequested(currentProfile.id));
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
      <hr></hr>
      <h3>Transfer List:</h3>
      {groupBy(currentProfile?.tradePile.transferList ?? [], "name").map(
        ({ item, count }) => {
          return (
            <div
              onClick={() => {
                navigation({
                  pathname: "/sell",
                  search: createSearchParams({
                    cardId: item.possibleCards[0].cardId,
                    email: email!,
                  }).toString(),
                });
              }}
            >
              <CardImage size="small" card={item.possibleCards[0]} />
              <div>Count: {count}</div>
              <hr></hr>
            </div>
          );
        }
      )}
      <h3>Transfer Targets:</h3>
      {groupBy(currentProfile?.tradePile.transferTargets ?? [], "name").map(
        ({ item, count }) => {
          return (
            <div>
              <div>{item.possibleCards[0].name}</div>
              <div>{item.playerCardStatus}</div>
              <div>{item.possibleCards[0].playerType}</div>
              <div>{item.possibleCards[0].rating}</div>
              <div>Count: {count}</div>
              <hr></hr>
            </div>
          );
        }
      )}
      <h3>Unassigned Items:</h3>
      {groupBy(currentProfile?.tradePile.unassignedItems ?? [], "name").map(
        ({ item, count }) => {
          return (
            <div>
              <div>{item.possibleCards[0].name}</div>
              <div>{item.playerCardStatus}</div>
              <div>{item.possibleCards[0].playerType}</div>
              <div>{item.possibleCards[0].rating}</div>
              <div>Count: {count}</div>
              <hr></hr>
            </div>
          );
        }
      )}
    </div>
  );
};
