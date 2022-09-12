import { getCardImages } from "../../helpers/images";
import { Card } from "../../models/models";

interface Props {
  card: Card;
}

export const CardImage = ({ card }: Props) => {
  const { clubImg, flagImg, leagueImg, playerImg, revisionImg } =
    getCardImages(card);

  return (
    <div style={{ position: "relative" }}>
      <img
        src={revisionImg}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <img
        src={clubImg}
        style={{ position: "absolute", top: 405, left: 105 }}
      />
      <img
        src={flagImg}
        style={{ position: "absolute", top: 560, left: 123 }}
      />
      {/* <img src={leagueImg} style={{ position: "absolute", top: 0, left: 0 }} /> */}
      <img src={playerImg} style={{ position: "absolute", top: 0, left: 0 }} />
      <p>{card.name}</p>
      <p
        style={{
          position: "absolute",
          top: "120px",
          left: "116px",
          fontSize: "102px",
          fontWeight: 600,
          color: "gold",
        }}
      >
        {card.rating}
      </p>
    </div>
  );
};
