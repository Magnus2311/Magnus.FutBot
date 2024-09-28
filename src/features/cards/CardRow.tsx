import { Dropdown } from "react-bootstrap";
import { Card } from "../../models/models";
import * as Icon from "react-bootstrap-icons";

export const CardRow = ({
  card,
  onSelectCard,
  isRemoveable,
}: {
  card: Card;
  onSelectCard: (card: Card | undefined) => void;
  isRemoveable?: boolean;
}) => {
  const clubImg = `${card.team.imageUrl}`;
  const flagImg = `${card.nationality.imageUrl}`;
  const playerImg = `${card.shieldUrl}`;

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
        style={{ height: "60px", width: "50px" }}
        src={playerImg}
        alt={card.name}
      />
      <h5 style={{ flex: 3, margin: "0 auto" }}>{card.name}</h5>
      <h6 style={{ flex: 1, margin: "0 auto" }}>{card.rating}</h6>
      <img
        style={{ height: "40px", width: "40px", marginLeft: "15px" }}
        src={flagImg}
        alt={card.nationality.label}
      />
      <img
        style={{
          height: "40px",
          width: "40px",
          marginLeft: "10px",
          marginRight: "10px",
        }}
        src={clubImg}
        alt={card.team.label}
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
};
