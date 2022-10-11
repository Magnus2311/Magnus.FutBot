import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export const initLeagueLogos = {
  logos: async () => {
    await getLogos();
  },
};

export const leagueLogos: any = {};

const getLogos = async () => {
  const containerName = "league-logos";
  const token =
    "sp=racl&st=2022-10-05T15:51:41Z&se=2023-10-05T23:51:41Z&spr=https&sv=2021-06-08&sr=c&sig=QoXWQQyo5uVulSf%2Bun2wLFmqOp4sEBIVc7%2BlOMHjM5w%3D";
  const url = `https://futbotimagesstore.blob.core.windows.net/?${token}`;

  const blobService = new BlobServiceClient(url!);
  const containerClient: ContainerClient =
    blobService.getContainerClient(containerName);

  const getBlobsInContainer = async (containerClient: ContainerClient) => {
    for await (const blob of containerClient.listBlobsFlat()) {
      leagueLogos[
        `${blob.name.toUpperCase()}`
      ] = `https://futbotimagesstore.blob.core.windows.net/${containerName}/${blob.name}?${token}`;
    }
  };

  await getBlobsInContainer(containerClient);
};
