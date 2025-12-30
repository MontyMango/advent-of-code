import process = require("process");
import fs = require("fs");
import readline = require('readline');

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

async function createFile ( FILE_TO_WRITE_TO:string ): Promise<boolean>   {
    try {
        fs.writeFileSync(FILE_TO_WRITE_TO, '');
        // console.log('File created successfully!');
        return true;
    } catch (error) {
        console.error('writeToFile error', error);
        return false;
    }
}

async function appendToFile ( FILE_TO_WRITE_TO:string,  CONTENT:string ): Promise<boolean> {
    try {
        fs.writeFileSync(FILE_TO_WRITE_TO, CONTENT,  { flag: 'a+' });
        return true;
    } catch (error) {
        console.error('appendToFile error', error);
    }
}

async function calculateDial ( DIAL_TURN:string, dial:number, ticks:number, fileToWriteTo: string ): Promise<number[]>  {
    const DIRECTION_TO_TURN = DIAL_TURN.charAt(0);      // This will either be "R" or "L"
    let regexToUse = /[0-9]/g
    const NUMBERS_TO_TURN = Number(DIAL_TURN.match(regexToUse)?.join(""));   // Extract the number from DIAL_TURN
    let tmpDial:number = dial;
    let tmpTicks:number = ticks;
    let multiplier:number = 0;

    await appendToFile(fileToWriteTo, `Current Dial: ${tmpDial}\t| Current Ticks: ${tmpTicks}\t|| `);
    await appendToFile(fileToWriteTo, `${DIAL_TURN} ${DIRECTION_TO_TURN}${NUMBERS_TO_TURN}`)
    
    // console.log(tmpDial, DIRECTION_TO_TURN, DIAL_TURN.match(regexToUse)?.join(""));
    // If the direction were to be right, add the two numbers
    if(DIRECTION_TO_TURN == 'R')    {
        // If the dial is pointing at the 0, add it to the tick.
        if(((tmpDial + NUMBERS_TO_TURN) % 100) == 0)   {
            appendToFile(fileToWriteTo, ` added ticks: ${String((tmpDial+NUMBERS_TO_TURN)/100)}`);
            tmpTicks += (tmpDial+NUMBERS_TO_TURN)/100;
            tmpDial = 0;
        }
        // Get the remainder
        else if(dial + NUMBERS_TO_TURN > 99)    {
            do{
                multiplier++;
                // console.log(multiplier);
            } while ((dial + NUMBERS_TO_TURN) > (100 * (multiplier+1)));
            tmpDial = (dial + NUMBERS_TO_TURN) - (100 * multiplier);
            // appendToFile(fileToWriteTo, String(multiplier));
            await appendToFile(fileToWriteTo, ` added ticks: ${multiplier} `);

            tmpTicks += multiplier;
        }
        else    {
            tmpDial = dial + NUMBERS_TO_TURN;
        }
    }
    // If the direction were to be left, subtract the two numbers
    else    {
        // If the dial is pointing at the 0, add it to the tick.
        if(((tmpDial - NUMBERS_TO_TURN) % 100) == 0)   {
            appendToFile(fileToWriteTo, ` added ticks: ${String(((NUMBERS_TO_TURN-tmpDial)/100)+1)}`);
            tmpTicks += (Math.floor(NUMBERS_TO_TURN-tmpDial)/100)+1;
            tmpDial = 0;
        }
        // Get the remainder
        else if(dial - NUMBERS_TO_TURN < 0) {
            do { 
                multiplier++;
                // console.log(multiplier);
            } while ((NUMBERS_TO_TURN - dial) > (100 * (multiplier)));
            tmpDial = (dial - NUMBERS_TO_TURN) + (100 * multiplier);
            // appendToFile(fileToWriteTo, String(multiplier));

            // It doesn't count if the dial was at 0.
            if(dial === 0)   {
                multiplier--;
            }

            await appendToFile(fileToWriteTo, ` added ticks: ${multiplier} `);
            tmpTicks += multiplier;
        }
        else    {
            tmpDial = dial - NUMBERS_TO_TURN;
        }
    }

    await appendToFile(fileToWriteTo, ` ||\tnew Dial: ${tmpDial} |\tnew Ticks: ${tmpTicks}\n`);

    // console.log("Current dial:", tmpDial, "Current ticks:", tmpTicks);
    return [tmpDial, tmpTicks];
}

// I made this async because the console.log will display a 0 if it isn't
async function main ( FILE_TO_USE:string, FILE_TO_WRITE:string ): Promise<void> {
    try {
        await createFile(FILE_TO_WRITE);
        const file = await createFileReader(FILE_TO_USE);

        let dial:number = 50;
        let totalTicks:number = 0;
    
        for await (let line of file)    {
            [dial, totalTicks] = await calculateDial(line, dial, totalTicks, FILE_TO_WRITE);
        }
        console.log(`Password: ${totalTicks}`);
    } catch (error) {
        console.error("Main error", error);
    }
}

const READ_FILE = './puzzle-input.txt';
const WRITE_FILE = './output.txt';
main(READ_FILE, WRITE_FILE);



// Part 2 tries:

// 4852
// 5348     // Corrected the negatives that were happening due to misconfigured tmpDial
// 5568     // Corrected if the dial was 0 and was going left and right.
// 5657     //  Realized that only the left requires this fix  ^ (Answer)