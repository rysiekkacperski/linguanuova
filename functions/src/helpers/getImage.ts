import axios from "axios";

async function getImageUrl(prompt: string): Promise<string | null> {
  if (!process.env.PEXELS_API_KEY) {
    return null
  }

  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      headers: {
        Authorization: process.env.PEXELS_API_KEY
      },
      params: {
        query: prompt,
        per_page: 1
      }
    });

    const photos = response.data.photos;

    if (photos && photos.length > 0) {
      return photos[0].src.medium; // Return the URL of the first image
    } else {
      return null; // No images found
    }
    
  } catch (error) {
    console.error("Error fetching image from Pexels:", error);
    return null;
  }

}

export default getImageUrl;
