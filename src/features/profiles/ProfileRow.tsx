import { useState } from "react";
import { LoginStatusType, ProfileDTO } from "../../models/models";
import coin from "../../assets/profiles/coin.png";
import cancel from "../../assets/profiles/cancel.png";
import checked from "../../assets/profiles/checked.png";
import contract from "../../assets/profiles/contract.png";
import hourglass from "../../assets/profiles/hourglass.png";
import tasks from "../../assets/profiles/tasks.png";
import man from "../../assets/profiles/man.png";
import ImageContent from "./ImageNumber";

const templateProfile = {
  email: "iavor.orlyov1@gmail.com",
  wonTargetsCount: 37,
  activeBidsCount: 11,
  unAssignedCount: 3,
  transferListCount: 72,
  outbidded: 3,
  coins: 2486919,
  status: LoginStatusType.Successful,
} as ProfileDTO;

const ProfileRow = (profile: ProfileDTO) => {
  return (
    <div
      style={{
        width: "clamp(200px, 60%, 700px)",
        borderLeft: "6px solid #2196F3",
        padding: "10px",
        margin: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          placeItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            paddingBottom: "6px",
            marginRight: "12px",
            flex: 3,
          }}
        >
          <ImageContent src={man} alt="Profile" content={profile.email} />
        </div>
        <ImageContent src={coin} alt="Coins" content={profile.coins} />
      </div>
      <div style={{ placeItems: "center", display: "flex" }}>
        <ImageContent
          src={cancel}
          alt="Outbidded count"
          content={profile.outbidded}
        />
        <ImageContent
          src={checked}
          alt="Won targets count"
          content={profile.wonTargetsCount}
        />
        <ImageContent
          src={contract}
          alt="Transfer list count"
          content={profile.transferListCount}
        />
        <ImageContent
          src={hourglass}
          alt="Active bids count"
          content={profile.activeBidsCount}
        />
        <ImageContent
          src={tasks}
          alt="Unassigned count"
          content={profile.unAssignedCount}
        />
      </div>
    </div>
  );
};

export default ProfileRow;
