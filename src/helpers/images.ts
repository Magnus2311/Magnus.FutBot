import { Card } from "../models/models";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export const getCardImages = (card: Card) => {
  const containerName = `newcontainer`;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;
  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;

  const blobService = new BlobServiceClient(sasToken!);
  const containerClient: ContainerClient =
    blobService.getContainerClient(containerName);

  const getBlobsInContainer = async (containerClient: ContainerClient) => {
    const returnedBlobUrls: string[] = [];

    // get list of blobs in container
    // eslint-disable-next-line
    for await (const blob of containerClient.listBlobsFlat()) {
      // if image is public, just construct URL
      returnedBlobUrls.push(
        `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
      );
    }

    return returnedBlobUrls;
  };

  getBlobsInContainer(containerClient).then((blobs) => {
    debugger;
  });

  try {
    return {
      revisionImg: require(`../../../assets/revision-images/${card.revision}.png`),
      clubImg: require(`../../../assets/club-logos/${card.clubId}.png`),
      leagueImg: require(`../../../assets/league-logos/${card.leagueId}.png`),
      flagImg: require(`../../../assets/player-flags/${card.nationId}.png`),
      playerImg: require(`../../../assets/player-images/${card.name}-${card.revision}-${card.rating}.png`),
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
