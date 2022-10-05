import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export const playerFlags = {
  logos: async () => await getFlags(),
};

const getFlags = async () => {
  const containerName = "player-flags";
  const token =
    "sp=rl&st=2022-10-05T15:51:41Z&se=2023-10-05T23:51:41Z&spr=https&sv=2021-06-08&sr=c&sig=iliPKDLaSF4hUVcDAkNN1WVKjrThzmha9GDzHJyEcYY%3D";
  const url = `https://futbotimagesstore.blob.core.windows.net/?${token}`;

  const blobService = new BlobServiceClient(url!);
  const containerClient: ContainerClient =
    blobService.getContainerClient(containerName);

  const getBlobsInContainer = async (
    containerClient: ContainerClient
  ): Promise<any> => {
    const returnedBlobUrls: any = {};

    for await (const blob of containerClient.listBlobsFlat()) {
      returnedBlobUrls[
        `${blob.name}`
      ] = `https://futbotimagesstore.blob.core.windows.net/${containerName}/${blob.name}?${token}`;

      return returnedBlobUrls;
    }
  };

  return await getBlobsInContainer(containerClient);
};
