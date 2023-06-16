import { readFileSync } from 'node:fs';

let packageJsonContent: any;
const getPackage = () => {
    if (packageJsonContent) {
        return packageJsonContent;
    }
    const packageString = readFileSync('./package.json', { encoding: 'utf-8' });
    packageJsonContent = JSON.parse(packageString);
    return packageJsonContent;
};

export default getPackage;