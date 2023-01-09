import path from 'path'
import { promises as fs } from 'fs'

const directory = path.join(process.cwd(), 'public/images');

export async function getBackgroundImagePaths() {
    const imageArray = [];

    const fileContents = await fs.readdir(directory + '/bg/');

    fileContents.forEach(file => {
        const imgPath = path.join(directory, 'bg')
        imageArray.push('/images/bg/' + file);
    });

    return imageArray;
}