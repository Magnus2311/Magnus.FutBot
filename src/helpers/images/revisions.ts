import {BlobServiceClient, ContainerClient} from "@azure/storage-blob"

export const revisions = {
    logos: async () => await getRevisions() 
}

const getRevisions = async () => {
    const containerName = "revisions";
  const token = "sp=rl&st=2022-10-05T15:50:40Z&se=2023-10-05T23:50:40Z&spr=https&sv=2021-06-08&sr=c&sig=FbBTt1K9yQVObJ3T%2F86b1ouvbMiW96WITu%2FJ6xZhlYM%3D";
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

  const revisions = await  getBlobsInContainer(containerClient);
  return revisions;
}