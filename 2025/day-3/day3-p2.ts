import { FILE } from "dns";

// import createFileReader from '../common_modules';
const fs = require('fs');
const readline = require('readline');
let lineRead = 0;

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


function createNumber(numberArray:number[]): number    {
    let totalJoltage = 0;
    for(let i = 0; i < numberArray.length; i++) {
        totalJoltage = (totalJoltage * 10) + numberArray[i];
    }
    return totalJoltage;
}

// Split the string IDs and convert them into a number when returning them.
async function findMaxVoltage(voltageString:string): Promise<number> {
    let joltageBank:number[] = [ Number(voltageString[0]) ];
    let MAX_JOLTAGE_DIGITS = 12;     // Stated in the problem, we need 12 digits instead of 2

    // Start at the first 
    for(let i = 1; i < voltageString.length; i++)   {
        let currentNumber = Number(voltageString[i]);
        let lastNumberPutIn = joltageBank[joltageBank.length - 1];
        let emptySlotsInJoltageBank = MAX_JOLTAGE_DIGITS - joltageBank.length;
        let remainingNumbersInString = voltageString.length - i;
        // console.log(i, voltageString.length - 1);

        // console.log(remainingNumbersInString, emptySlotsInJoltageBank)

        // REPLACE THE FIRST DIGIT
        // We will reassign the first index if the number is less than the current number's index 
        // AND the index - MAX_JOLTAGE_DIGITS is greater than 0
        // if(joltageBank[0] < currentNumber && i - MAX_JOLTAGE_DIGITS <= 0)    {
        //     joltageBank[0] = currentNumber;
        // }
        
        // REPLACE THE LAST PUSHED DIGIT
        // Check to see if we can replace the number at the end of the joltage bank with the new number
        // We also have to check to see if this can be replaced or we have to put this at the end of the array
        if(lastNumberPutIn < currentNumber && remainingNumbersInString > emptySlotsInJoltageBank) {
            joltageBank[joltageBank.length - 1] = currentNumber;
        }

        // ADD THE DIGIT TO THE END OF THE BANK IF ALL ELSE FAILS
        // If we have the space, we will place this at the end
        else if(joltageBank.length < MAX_JOLTAGE_DIGITS) {
            joltageBank.push(currentNumber);
        }

       
    }

    // if(joltageBank.length < MAX_JOLTAGE_DIGITS) {
    //     console.log(joltageBank, joltageBank.length);
    // }
    let maxJoltage = createNumber(joltageBank);
    return maxJoltage;

}
// TODO: Possibly convert to a common module?
function addSumsTogether(sums:number[]): number {
    let total:number = 0;
    for(let i:number = 0; i < sums.length; i++)  {
        let currentNumber:number = sums[i];
        total += currentNumber;
    }
    return total;    
}

async function main ( FILE_TO_USE:string ): Promise<void> {
    try {
        let BANKS = await createFileReader(FILE_TO_USE);
        let banksToKeep:number[] = [];

        for await (let currentBankString of BANKS)    {
            banksToKeep.push(await findMaxVoltage(currentBankString));
        }
        BANKS.close();
        
        
        console.log(banksToKeep);
        let jotageTotal:number = await addSumsTogether(banksToKeep);
        console.log(jotageTotal);

    } catch (error) {
        console.error("Main error", error);
    }
}

// If we request only this file to be ran, read the puzzle input.
// This should be ignored by the Jest tests
if(require.main === module) {
    (async () => {
        try {
            let FILE_TO_READ = './puzzle-input.txt';
            await main(FILE_TO_READ);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    })();
}

export {
    findMaxVoltage, 
    addSumsTogether
}
// Attempts (Example.txt):


// Attempts (Puzzle.txt):

