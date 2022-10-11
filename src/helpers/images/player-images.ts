import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export const initPlayerImages = {
  logos: async () => {
    await getImages();
  },
};

export const playerImages: any = {};

const getImages = async () => {
  const containerName = "player-images";
  const token =
    "sp=rl&st=2022-10-03T06:54:00Z&se=2023-10-06T14:54:00Z&spr=https&sv=2021-06-08&sr=c&sig=34buDEPL6kLjpb6HdlMMcL1jd7p5KEbytjLGsDdRRdE%3D";
  const url = `https://futbotimagesstore.blob.core.windows.net/?${token}`;

  const blobService = new BlobServiceClient(url!);
  const containerClient: ContainerClient =
    blobService.getContainerClient(containerName);

  const getBlobsInContainer = async (containerClient: ContainerClient) => {
    for await (const blob of containerClient.listBlobsFlat()) {
      playerImages[
        `${blob.name.toUpperCase()}`
      ] = `https://futbotimagesstore.blob.core.windows.net/${containerName}/${blob.name}?${token}`;
    }
  };

  await getBlobsInContainer(containerClient);
};
