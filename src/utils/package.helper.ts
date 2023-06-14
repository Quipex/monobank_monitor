import { readFileSync } from 'node:fs';

const parsedPackage = JSON.parse(readFileSync('./package.json', { encoding: 'utf-8' }));

export default parsedPackage;