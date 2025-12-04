import process = require("process");
import fs = require("fs");
import readline = require('readline');

async function createFileReader ( FILE_TO_READ:string ): Promise<any> {
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

async function calculateDial ( DIAL_TURN:string, dial:number, ticks:number ): Promise<number[]>  {
    const DIRECTION_TO_TURN = DIAL_TURN.charAt(0);      // This will either be "R" or "L"
    let regexToUse = /[0-9]/g
    const NUMBERS_TO_TURN = Number(DIAL_TURN.match(regexToUse)?.join(""));   // Extract the number from DIAL_TURN
    let tmpDial:number = dial;
    let tmpTicks:number = ticks;
    let multiplier:number = 0;

    // console.log(tmpDial, DIRECTION_TO_TURN, DIAL_TURN.match(regexToUse)?.join(""));
    // If the direction were to be right, add the two numbers
    if(DIRECTION_TO_TURN == 'R')    {
        // If the dial is pointing at the 0, add it to the tick.
        if(((tmpDial + NUMBERS_TO_TURN) % 100) == 0)   {
            tmpDial = 0;
            tmpTicks++;
        }
        // Get the remainder
        else if(dial + NUMBERS_TO_TURN > 99)    {
            do{
                multiplier++;
                // console.log(multiplier);
            } while ((dial + NUMBERS_TO_TURN) > (100 * (multiplier+1)));
            tmpDial = (dial + NUMBERS_TO_TURN) - (100 * multiplier);
        }
        else    {
            tmpDial = dial + NUMBERS_TO_TURN;
        }
    }
    // If the direction were to be left, subtract the two numbers
    else    {
        // If the dial is pointing at the 0, add it to the tick.
        if(((tmpDial - NUMBERS_TO_TURN) % 100) == 0)   {
            tmpDial = 0;
            tmpTicks++;
        }
        // Get the remainder
        else if(dial - NUMBERS_TO_TURN < 0) {
            do { 
                multiplier++;
                // console.log(multiplier);
            } while ((NUMBERS_TO_TURN - dial) > (100 * (multiplier)));
            
            tmpDial = (dial - NUMBERS_TO_TURN) + (100 * multiplier);
        }
        else    {
            tmpDial = dial - NUMBERS_TO_TURN;
        }
    }

    // console.log("Current dial:", tmpDial, "Current ticks:", tmpTicks);
    return [tmpDial, tmpTicks];
}

async function main ( FILE_TO_USE:string ): Promise<void> {
    try {
        const file = await createFileReader(FILE_TO_USE);
        let dial:number = 50;
        let totalTicks:number = 0;
    
        for await (let line of file)    {
            [dial, totalTicks] = await calculateDial(line, dial, totalTicks);
        }
        console.log(`Password: ${totalTicks}`);
    } catch (error) {
        console.error("Main error", error);
    }
}

const FILE = 'puzzle-input.txt';
main(FILE);
