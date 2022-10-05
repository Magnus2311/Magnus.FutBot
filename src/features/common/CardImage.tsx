import { useEffect, useState } from "react";
import { getCardImages } from "../../helpers/images";
import { Card } from "../../models/models";

interface Props {
  card: Card;
  size: "small" | "medium" | "large";
  onClick?: () => void;
}

export const CardImage = ({ card, size, onClick }: Props) => {
  const [clubImg, setClubImg] = useState("");
  const [flagImg, setFlagImg] = useState("");
  const [playerImg, setPlayerImg] = useState("");
  const [revisionImg, setRevisionImg] = useState("");

  useEffect(() => {
    getCardImages(card).then((imgObj) => {
      setClubImg(imgObj.clubImg);
      setFlagImg(imgObj.flagImg);
      setPlayerImg(imgObj.playerImg);
      setRevisionImg(imgObj.revisionImg);
    });
  }, []);

  let scale = 0.3;
  let width = 99.6;
  let height = 250;
  let marginLeft = -60;

  if (size === "small") {
    scale = 0.15;
    width = 70;
    height = 120;
    marginLeft = -40;
  }
  if (size === "large") {
    scale = 0.45;
    width = 180;
    height = 380;
    marginLeft = -80;
  }

  return (
    <div
      style={{ width: width, height: height, marginLeft: marginLeft }}
      onClick={onClick}
    >
      <div style={{ position: "relative", scale: `${scale}` }}>
        <img
          alt={card.name}
          src={revisionImg}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <img
          alt={card.name}
          src={clubImg}
          style={{ position: "absolute", top: 250, left: 100, scale: "0.8" }}
        />
        <img
          alt={card.name}
          src={flagImg}
          style={{ position: "absolute", top: 400, left: 115 }}
        />
        {/* <img src={leagueImg} style={{ position: "absolute", top: 0, left: 0 }} /> */}
        <img
          alt={card.name}
          src={playerImg}
          style={{ scale: "1.6", position: "absolute", top: 200, left: 320 }}
        />
        <p
          style={{
            position: "absolute",
            top: "440px",
            left: "90px",
            fontSize: "80px",
            fontWeight: 400,
            color: "gold",
            width: "466px",
            textAlign: "center",
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
        <hr
          style={{
            color: "gold",
            top: "535px",
            width: "280px",
            height: "6px",
            position: "absolute",
            left: "183px",
          }}
        />
        <p
          style={{
            position: "absolute",
            color: "gold",
            top: "550px",
            fontSize: "50px",
            left: "110px",
            width: "200px",
          }}
        >
          {card.stats.pace.overall} PAC
        </p>
        <p
          style={{
            position: "absolute",
            color: "gold",
            top: "600px",
            fontSize: "50px",
            left: "110px",
            width: "200px",
          }}
        >
          {card.stats.shooting.overall} SHO
        </p>
        <p
          style={{
            position: "absolute",
            color: "gold",
            top: "650px",
            fontSize: "50px",
            left: "110px",
            width: "200px",
          }}
        >
          {card.stats.passing.overall} PAS
        </p>
        <hr
          style={{
            position: "absolute",
            top: "550px",
            left: "315px",
            width: "6px",
            height: "150px",
            display: "inline-block",
            color: "gold",
          }}
        />
        <p
          style={{
            position: "absolute",
            color: "gold",
            top: "550px",
            fontSize: "50px",
            left: "350px",
            width: "200px",
          }}
        >
          {card.stats.dribbling.overall} DRI
        </p>
        <p
          style={{
            position: "absolute",
            color: "gold",
            top: "600px",
            fontSize: "50px",
            left: "350px",
            width: "200px",
          }}
        >
          {card.stats.defending.overall} DEF
        </p>
        <p
          style={{
            position: "absolute",
            color: "gold",
            top: "650px",
            fontSize: "50px",
            left: "350px",
            width: "200px",
          }}
        >
          {card.stats.physicality.overall} PHY
        </p>
      </div>
    </div>
  );
};
