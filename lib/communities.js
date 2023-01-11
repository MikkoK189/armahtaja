import path from 'path'
import { promises as fs } from 'fs'

const directory = path.join(process.cwd(), 'communities');

export async function getCommunityPaths() {
    const fileContents = await fs.readFile(directory + '/communities.json', 'utf8');
    const parsedFile = JSON.parse(fileContents)

    return parsedFile.map((c) => {
        return {
            params: {
                community: c.slug.toString()
            }
        };
    });
}

export async function getCommunityData(communityToFind) {
    const fileContents = await fs.readFile(directory + '/communities.json', 'utf8');
    const parsedFile = JSON.parse(fileContents);

    return parsedFile.find((community) => community.slug === communityToFind);
}

export async function getAllCommunities() {
    const fileContents = await fs.readFile(directory + '/communities.json', 'utf8');
    const parsedFile = JSON.parse(fileContents);

    return parsedFile;
}