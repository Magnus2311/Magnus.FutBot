import { LoginStatusType, ProfileDTO } from "../../models/models";
import ImageContent from "./ImageNumber";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router";
import { getProfileConnection } from "./profileActions";

import coin from "../../assets/coin.png";
import checked from "../../assets/coin.png";
import contract from "../../assets/coin.png";
import hourglass from "../../assets/coin.png";
import tasks from "../../assets/coin.png";
import man from "../../assets/coin.png";
import cancel from "../../assets/coin.png";
import RefreshImage from "../../assets/coin.png";

const templateProfile = {
  email: "iavor.orlyov1@gmail.com",
  coins: 2486919,
  status: LoginStatusType.Successful,
} as ProfileDTO;

const ProfileRow = ({
  profile,
  onRefresh,
}: {
  profile: ProfileDTO;
  onRefresh: (profileId: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  return (
    <div
      style={{
        width: "clamp(200px, 60%, 700px)",
        borderLeft: "6px solid #2196F3",
        padding: "10px",
        margin: "10px",
      }}
      onClick={() => {
        navigation(`${profile.email}`);
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
        <img
          src={RefreshImage}
          alt="Refresh"
          style={{
            width: "24px",
            height: "24px",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            getProfileConnection(dispatch).then((connection) => {
              connection.invoke("OnProfileRefresh", profile.id);
            });
          }}
        />
      </div>
      <div style={{ placeItems: "center", display: "flex" }}>
        <ImageContent src={cancel} alt="Outbidded count" content={0} />
        <ImageContent src={checked} alt="Won targets count" content={0} />
        <ImageContent
          src={contract}
          alt="Sold Items"
          content={profile.tradePile.transferList.soldItems.length}
        />
        <ImageContent
          src={contract}
          alt="Unsold Items"
          content={profile.tradePile.transferList.unsoldItems.length}
        />
        <ImageContent
          src={contract}
          alt="Available Items"
          content={profile.tradePile.transferList.availableItems.length}
        />
        <ImageContent
          src={contract}
          alt="Active Items"
          content={profile.tradePile.transferList.activeTransfers.length}
        />
        <ImageContent
          src={tasks}
          alt="Unassigned count"
          content={profile.tradePile.unassignedItems.length}
        />
      </div>
    </div>
  );
};

export default ProfileRow;
