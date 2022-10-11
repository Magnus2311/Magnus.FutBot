import { Card } from "../models/models";
import { clubLogos } from "./images/club-logos";
import { leagueLogos } from "./images/league-logos";
import { playerFlags } from "./images/player-flags";
import { playerImages } from "./images/player-images";
import { revisions } from "./images/revisions";

export const getCardImages = async (card: Card) => {
  debugger;
  return {
    revisionImg: revisions[`${card.revision}.PNG`] ?? "",
    clubImg: clubLogos[`${card.clubId}.PNG`] ?? "",
    leagueImg: leagueLogos[`${card.leagueId}.PNG`] ?? "",
    flagImg: playerFlags[`${card.nationId}.PNG`] ?? "",
    playerImg:
      playerImages[`${card.name}-${card.revision}-${card.rating}.png`] ?? "",
  };
};
