import { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, loadImage } from "canvas";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // LinkedIn profile picture URL
  const profilePicUrl =
    "https://media-exp1.licdn.com/dms/image/C5603AQF6QvX9M3K6Ug/profile-displayphoto-shrink_200_200/0/1610431992765?e=1647484800&v=beta&t=IAi_sVTwzdBePNi1EL_hc7I0SqqS_lV7OoMvqxfrV7k";

  // Use axios to fetch the image from LinkedIn
  const response = await axios.get(profilePicUrl, {
    responseType: "arraybuffer",
  });
  const buffer = Buffer.from(response.data);

  try {
    // Load the image into the canvas
    const image = await loadImage(buffer);
    const canvas = createCanvas(200, 200);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, 200, 200);

    // Send the canvas as a response
    const buffer = canvas.toBuffer("image/png");
    res.setHeader("Content-Type", "image/png");
    res.send(buffer);
  } catch (error) {
    res.status(500).send("Error loading image into canvas");
  }
}
