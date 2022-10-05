import { Card } from "../models/models";
import { clubLogos } from "./images/club-logos";
import { leagueLogos } from "./images/league-logos";
import { playerFlags } from "./images/player-flags";
import { playerImages } from "./images/player-images";
import { revisions } from "./images/revisions";

export const getCardImages = async (card: Card) => {
    return {
      revisionImg: ((await revisions.logos())[`${card.revision}.png` as unknown as any]) ?? "",
      clubImg: ((await clubLogos.logos())[`${card.clubId}.png` as unknown as any]) ?? "",
      leagueImg: ((await leagueLogos.logos())[`${card.leagueId}.png` as unknown as any]) ?? "",
      flagImg: ((await playerFlags.logos())[`${card.nationId}.png` as unknown as any]) ?? "",
      playerImg: ((await playerImages.logos())[`${card.name}-${card.revision}-${card.rating}.png` as unknown as any]) ?? "",
    };
};
