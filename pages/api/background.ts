import { getBackgroundImagePaths } from "../../lib/backgroundImages";

export default async function handler(_req : any, res : any) {
    const directory = await getBackgroundImagePaths()

    res.status(200).json({directory});
}