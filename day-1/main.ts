import process = require("process");
import fs = require("fs");
import readline = require('readline');

function createFileReader ( FILE_TO_READ:string ): any {
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

function calculateDial ( DIAL_TURN:string, dial:number, ticks:number ): any  {
    const DIRECTION_TO_TURN = DIAL_TURN.charAt(0);      // This will either be "R" or "L"
    let regexToUse = /[0-9]/g
    const NUMBERS_TO_TURN = Number(DIAL_TURN.match(regexToUse)?.join(""));   // Extract the number from DIAL_TURN
    let tmpDial:number = dial;
    let tmpTicks:number = ticks;
    // let multiplier:number = 0;
    
    
    console.log(tmpDial, DIRECTION_TO_TURN, DIAL_TURN.match(regexToUse)?.join(""));

    // If the direction were to be right, add the two numbers
    if(DIRECTION_TO_TURN == 'R')    {
        // If the dial is pointing at the 0, add it to the tick.
        if(((tmpDial + NUMBERS_TO_TURN) % 100) == 0)   {
            tmpDial = 0;
            tmpTicks++;
        }
        // Get the remainder
        else if(dial + NUMBERS_TO_TURN > 99)    {
            tmpDial = (dial + NUMBERS_TO_TURN) - (100);
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
            tmpDial = (dial - NUMBERS_TO_TURN) + (100);
        }
        else    {
            tmpDial = dial - NUMBERS_TO_TURN;
        }
    }

    console.log("Current dial:", tmpDial, "Current ticks:", tmpTicks, "\n");
    return [tmpDial, tmpTicks];
}

function main ( FILE_TO_USE:string ): void {
    try {
        const file = createFileReader(FILE_TO_USE);
        let dial:number = 50;
        let totalTicks:number = 0;
    
        file.on('line', (line:string) =>   {
            [dial, totalTicks] = calculateDial(line, dial, totalTicks);
        });
        console.log(`Password: ${totalTicks}`);
    } catch (error) {
        console.error("Main error", error);
    }
}

const FILE = 'example-input.txt';
main(FILE);
