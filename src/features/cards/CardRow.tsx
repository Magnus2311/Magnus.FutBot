import { Dropdown } from "react-bootstrap";
import { Card } from "../../models/models";
import * as Icon from "react-bootstrap-icons";
import { getCardImages } from "../../helpers/images";

export const CardRow = ({
  card,
  onSelectCard,
  isRemoveable,
}: {
  card: Card;
  onSelectCard: (card: Card | undefined) => void;
  isRemoveable?: boolean;
}) => {
  try {
    const { clubImg, flagImg, leagueImg, playerImg, revisionImg } =
      getCardImages(card);

    return (
      <Dropdown.Item
        key={card.cardId}
        eventKey="1"
        style={{
          width: "clamp(50%, 600px, 100%)",
          display: "inline-flex",
          placeItems: "center",
        }}
        onClick={() => {
          if (!isRemoveable) onSelectCard(card);
        }}
      >
        <img
          style={{ height: "50px", width: "40px" }}
          src={revisionImg}
          alt={card.revision}
        />
        <img
          style={{ height: "40px", width: "40px" }}
          src={playerImg}
          alt={card.name}
        />
        <h5 style={{ flex: 3, margin: "0 auto" }}>{card.name}</h5>
        <h6 style={{ flex: 1, margin: "0 auto" }}>{card.rating}</h6>
        <img
          style={{ height: "15px", width: "25px", marginLeft: "15px" }}
          src={flagImg}
          alt={card.nation}
        />
        <img
          style={{
            height: "30px",
            width: "30px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          src={clubImg}
          alt={card.club}
        />
        <img
          style={{ height: "25px", width: "25px" }}
          src={leagueImg}
          alt={card.league}
        />
        {isRemoveable && (
          <Icon.XCircle
            size={25}
            color="red"
            onClick={() => onSelectCard(undefined)}
            style={{ marginLeft: "40px" }}
          />
        )}
      </Dropdown.Item>
    );
  } catch {
    return <></>;
  }
};
