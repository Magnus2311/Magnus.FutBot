import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export const initRevisions = {
  logos: async () => {
    await getRevisions();
  },
};

export const revisions: any = {};

const getRevisions = async () => {
  const containerName = "revisions";
  const token =
    "sp=rl&st=2022-10-05T15:50:40Z&se=2023-10-05T23:50:40Z&spr=https&sv=2021-06-08&sr=c&sig=FbBTt1K9yQVObJ3T%2F86b1ouvbMiW96WITu%2FJ6xZhlYM%3D";
  const url = `https://futbotimagesstore.blob.core.windows.net/?${token}`;

  const blobService = new BlobServiceClient(url!);
  const containerClient: ContainerClient =
    blobService.getContainerClient(containerName);

  const getBlobsInContainer = async (containerClient: ContainerClient) => {
    for await (const blob of containerClient.listBlobsFlat()) {
      revisions[
        `${blob.name.toUpperCase()}`
      ] = `https://futbotimagesstore.blob.core.windows.net/${containerName}/${blob.name}?${token}`;
    }
  };

  await getBlobsInContainer(containerClient);
};
