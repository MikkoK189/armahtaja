import path from 'path'
import { promises as fs } from 'fs'

const directory = path.join(process.cwd(), 'communities');

export interface Community {
    slug: string;
    serverId: string;
    name: string;
    logoUrl: string;
    description: string;
    joiningInstruction: string;
}

export async function getCommunityPaths() {
    const fileContents = await fs.readFile(directory + '/communities.json', 'utf8');
    const parsedFile = JSON.parse(fileContents)

    return parsedFile.map((c : Community) => {
        return {
            params: {
                community: c.slug.toString()
            }
        };
    });
}

export async function getCommunityData(communityToFind : string) : Promise<Community> {
    const fileContents = await fs.readFile(directory + '/communities.json', 'utf8');
    const parsedFile = JSON.parse(fileContents);

    return parsedFile.find((community : Community) => community.slug === communityToFind);
}

export async function getAllCommunities() : Promise<Community[]> {
    const fileContents = await fs.readFile(directory + '/communities.json', 'utf8');
    const parsedFile = JSON.parse(fileContents);

    return parsedFile;
}