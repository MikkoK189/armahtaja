import { getBackgroundImagePaths } from "../../lib/backgroundImages";

export default async function handler(req, res) {
    const directory = await getBackgroundImagePaths()

    res.status(200).json({directory});
}