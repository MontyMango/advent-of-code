// Name: MontyMango
// common_modules are used for commonly used modules

import fs from 'fs';
import readline  from 'readline';

async function createFileReader ( FILE_TO_READ:string ): Promise<readline.Interface | undefined> {
    try {
        let fileStream = fs.createReadStream(FILE_TO_READ);
        return readline.createInterface({
            input: fileStream,
            output: process.stdout,
            terminal: false
        });
    } catch (error) {
        console.error("createFileReader error", error);
    }
}

module.exports = { createFileReader };