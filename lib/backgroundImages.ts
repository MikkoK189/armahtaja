import path from 'path'
import { promises as fs } from 'fs'

const directory = path.join(process.cwd(), 'public/images');

export async function getBackgroundImagePaths() : Promise<string[]> {
    const imageArray = <string[]>[];

    const fileContents = await fs.readdir(directory + '/bg/');

    fileContents.forEach(file => {
        imageArray.push('/images/bg/' + file);
    });

    return imageArray;
}