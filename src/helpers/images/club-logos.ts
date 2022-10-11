import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export const initClubLogos = {
  logos: async () => {
    await setLogos();
  },
};

export const clubLogos: any = {};

const setLogos = async () => {
  const containerName = "club-logos";
  const token =
    "sp=rl&st=2022-10-05T15:50:13Z&se=2023-10-05T23:50:13Z&spr=https&sv=2021-06-08&sr=c&sig=zzyG%2BH8nNe0%2BClkPAbRwfBXUx7YsxsDPDpb6tIfLEj0%3D";
  const url = `https://futbotimagesstore.blob.core.windows.net/?${token}`;

  const blobService = new BlobServiceClient(url!);
  const containerClient: ContainerClient =
    blobService.getContainerClient(containerName);

  const getBlobsInContainer = async (containerClient: ContainerClient) => {
    for await (const blob of containerClient.listBlobsFlat()) {
      clubLogos[
        `${blob.name.toUpperCase()}`
      ] = `https://futbotimagesstore.blob.core.windows.net/${containerName}/${blob.name}?${token}`;
    }
  };

  await getBlobsInContainer(containerClient);
};
