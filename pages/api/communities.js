import path from 'path'
import { promises as fs } from 'fs'

export default async function handler(req, res) {
    const directory = path.join(process.cwd(), 'communities');
    const fileContents = await fs.readFile(directory + '/communities.json', 'utf8');
    
    const parsedFile = JSON.parse(fileContents);

    res.status(200).json({parsedFile});
}