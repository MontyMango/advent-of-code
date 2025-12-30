// import createFileReader from '../common_modules';
const fs = require('fs');
const readline = require('readline');

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


function createNumber(firstString:string, secondString:string): number    {
    return Number(`${firstString}${secondString}`)
}

// Split the string IDs and convert them into a number when returning them.
async function findMaxVoltage(voltageString:string): Promise<number> {
    let firstIndex = 0;
    let secondIndex = 1;
    // let largestNumber = generateNumber(voltageString[0], voltageString[1]);

    // Start at the first 
    for(let i = 1; i < voltageString.length; i++)   {
        // let currentNumber = generateNumber(voltageString[firstIndex], voltageString[secondIndex]);

        // console.log(i, voltageString.length - 1);
        if(Number(voltageString[firstIndex]) < Number(voltageString[i]) && i < (voltageString.length - 1))    {
            firstIndex = i;
            secondIndex = -1;
        }

        else if(Number(voltageString[secondIndex]) < Number(voltageString[i]) || secondIndex == -1) {
            secondIndex = i;
        }
    }
    let maxJoltage = createNumber(voltageString[firstIndex], voltageString[secondIndex]);
    return maxJoltage;

}
// TODO: Possibly convert to a common module?
async function addSumsTogether(sums:number[]): Promise<number> {
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
        
        console.log(banksToKeep);
        let jotageTotal:number = await addSumsTogether(banksToKeep);
        console.log(jotageTotal);

    } catch (error) {
        console.error("Main error", error);
    }
}

const READ_FILE = './puzzle-input.txt';
main(READ_FILE);


// Attempts (Example.txt):
// [ 98, 91, 83, 98 ] = 370
// [ 98, 89, 78, 91 ] = 356 (Added i < (voltageString.length - 1) on line 34)
// [ 98, 89, 78, 92 ] = 357 (Added "|| secondIndex == -1" on line 39)


// Attempts (Puzzle.txt):
/*
[
  77, 88, 88, 76, 85, 66, 66, 85, 97, 77, 86, 99,
  66, 99, 99, 99, 77, 98, 85, 65, 99, 86, 87, 44,
  99, 55, 87, 77, 66, 98, 77, 72, 99, 97, 99, 76,
  98, 77, 88, 88, 95, 55, 87, 99, 66, 55, 88, 96,
  66, 77, 88, 44, 99, 55, 99, 76, 86, 88, 66, 99,
  77, 89, 88, 87, 99, 99, 88, 77, 89, 77, 85, 76,
  77, 88, 87, 99, 44, 88, 99, 77, 99, 99, 97, 87,
  55, 99, 55, 89, 83, 88, 97, 99, 95, 99, 74, 99,
  88, 99, 99, 77,
  ... 100 more items
]
17031 (Correct)
*/