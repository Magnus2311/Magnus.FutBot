import {BlobServiceClient, ContainerClient} from "@azure/storage-blob"

export const clubLogos = {
    logos: async () => await getLogos() 
}

const getLogos = async () => {
    const containerName = "club-logos";
  const token = "sp=rl&st=2022-10-05T15:50:13Z&se=2023-10-05T23:50:13Z&spr=https&sv=2021-06-08&sr=c&sig=zzyG%2BH8nNe0%2BClkPAbRwfBXUx7YsxsDPDpb6tIfLEj0%3D";
  const url = `https://futbotimagesstore.blob.core.windows.net/?${token}`;

  const blobService = new BlobServiceClient(url!);
  const containerClient: ContainerClient =
    blobService.getContainerClient(containerName);

  const getBlobsInContainer = async (containerClient: ContainerClient) => {
    const returnedBlobUrls: any[] = [];

    for await (const blob of containerClient.listBlobsFlat()) {
        const currentImage: any = {};
        currentImage[`${blob.name}`] = `https://futbotimagesstore.blob.core.windows.net/${containerName}/${blob.name}?${token}`
      returnedBlobUrls.push(currentImage);
    }

    return returnedBlobUrls;
  };

  return await getBlobsInContainer(containerClient);
}