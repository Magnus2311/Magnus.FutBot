import {BlobServiceClient, ContainerClient} from "@azure/storage-blob"

export const playerImages = {
    logos: async () => await getImages() 
}

const getImages = async () => {
    const containerName = "player-images";
  const token = "sp=rl&st=2022-10-05T15:50:59Z&se=2022-10-05T23:50:59Z&spr=https&sv=2021-06-08&sr=c&sig=tVmEc56TRf4KhBz07R1RB9K00adYeXcIAZdrmkETex4%3D";
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