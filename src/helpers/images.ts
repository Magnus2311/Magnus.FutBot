import { Card } from "../models/models";

export const getCardImages = (card: Card) => {
  try {
    return {
      revisionImg: require(`../assets/revision-images/${card.revision}.png`),
      clubImg: require(`../assets/club-logos/${card.clubId}.png`),
      leagueImg: require(`../assets/league-logos/${card.leagueId}.png`),
      flagImg: require(`../assets/player-flags/${card.nationId}.png`),
      playerImg: require(`../assets/player-images/${card.name}-${card.revision}-${card.rating}.png`),
    };
  } catch {
    return {
      revisionImg: "",
      clubImg: "",
      leagueImg: "",
      flagImg: "",
      playerImg: "",
    };
  }
};
