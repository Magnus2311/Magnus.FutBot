import { getCardImages } from "../../helpers/images";
import { Card } from "../../models/models";

interface Props {
  card: Card;
}

export const CardImage = ({ card }: Props) => {
  const { clubImg, flagImg, leagueImg, playerImg, revisionImg } =
    getCardImages(card);

  return (
    <div style={{ position: "relative", scale: "0.5" }}>
      <img
        src={revisionImg}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <img
        src={clubImg}
        style={{ position: "absolute", top: 250, left: 100, scale: "0.8" }}
      />
      <img
        src={flagImg}
        style={{ position: "absolute", top: 400, left: 115 }}
      />
      {/* <img src={leagueImg} style={{ position: "absolute", top: 0, left: 0 }} /> */}
      <img
        src={playerImg}
        style={{ scale: "1.6", position: "absolute", top: 200, left: 320 }}
      />
      <p
        style={{
          position: "absolute",
          top: "500px",
          left: "104px",
          fontSize: "80px",
          fontWeight: 400,
          color: "gold",
        }}
      >
        {card.name}
      </p>
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
