import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export const initPlayerFlags = {
  logos: async () => {
    await getFlags();
  },
};

export const playerFlags: any = {};

const getFlags = async () => {
  const containerName = "player-flags";
  const token =
    "sp=racwdlmeop&st=2022-10-10T07:08:54Z&se=2023-10-11T15:08:54Z&spr=https&sv=2021-06-08&sr=c&sig=HKvExOmrazNS0Uf6q%2BNzKpCmzk0W%2BNsasRK3NYM75dQ%3D";
  const url = `https://futbotimagesstore.blob.core.windows.net/?${token}`;

  const blobService = new BlobServiceClient(url!);
  const containerClient: ContainerClient =
    blobService.getContainerClient(containerName);

  const getBlobsInContainer = async (
    containerClient: ContainerClient
  ): Promise<any> => {
    for await (const blob of containerClient.listBlobsFlat()) {
      playerFlags[
        `${blob.name.toUpperCase()}`
      ] = `https://futbotimagesstore.blob.core.windows.net/${containerName}/${blob.name}?${token}`;
    }
  };

  await getBlobsInContainer(containerClient);
};
