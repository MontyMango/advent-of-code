const fs = require('fs');

async function findInvalidID(number1:number, number2:number): Promise<number[]> {
    // Find which number is lower and which number is higher
    let lowNumber;
    let highNumber; 

    // Idk if a terninary operator could do this, so I just did it this way.
    if(number1 < number2)   {
        lowNumber = number1;
        highNumber = number2;
    }  else {
        lowNumber = number2;
        highNumber = number1;
    }

    let invalidNumbers:number[] = [];
    for(let number = lowNumber; number <= highNumber; number++)   {
        // Stringify the input, split it in half, and compare both sides to see if both match.
        let stringifiedNumber = String(number);
        
        // Since the patterns can be repeated AT LEAST twice, we're going to have to incorporate a stopping point for our for loop
        let stoppingPoint = Math.floor(stringifiedNumber.length / 2);
        
        for(let slicedIndex = 1; slicedIndex <= stoppingPoint; slicedIndex++)  {
            let slicedString = stringifiedNumber.slice(0,slicedIndex);
            let regexString = new RegExp(slicedString, 'g');
            // console.log(regexString);
            
            //
            let foundStrings:string[] = [];
            stringifiedNumber.matchAll(regexString).forEach(e => { foundStrings.push(e[0])});
            let result = foundStrings.join('');
            
            if(result === stringifiedNumber)    {
                invalidNumbers.push(number);
                console.log(`${result} | ${foundStrings}`);
                // console.log("Match!!!");
                break;      // This is cruicial for numbers like 222222 ( This for loop would count 222222 3 times )
            }
        }
    }
    return invalidNumbers;
}

// Split the string IDs and convert them into a number when returning them.
async function splitIDString(stringID:string): Promise<number[]> {
    let [number1, number2]:string[] = stringID.split("-");
    let int1 = Number(number1);
    let int2 = Number(number2);
    return [int1, int2] ;
}


// This will parse the file into an array so it can be easier to break down the puzzle.
async function parseFile(FILE_TO_READ:string): Promise<string[]>   {
    let splitData:string[];
    let file:string = fs.readFileSync(FILE_TO_READ, 'utf-8');
    splitData = file.split(',');
    // console.log("splitData contents", splitData);
    return splitData;
}

async function addAllInvalidIDs(invalidIDs:number[]): Promise<number> {
    let total = 0;
    for(let i = 0; i < invalidIDs.length; i++)  {
        let currentID:number = invalidIDs[i];
        total += currentID;
    }
    return total;    
}

async function main ( FILE_TO_USE:string ): Promise<void> {
    try {
        let IDs:string[] = await parseFile(FILE_TO_USE);
        let invalidIDs:number[] = [];

        for(let i = 0; i < IDs.length; i++) {
            let currentIDRange:string = IDs[i];
            let [num1, num2]:number[] = await splitIDString(currentIDRange);
            (await findInvalidID(num1, num2)).forEach((invalidid) => {invalidIDs.push(invalidid);})
        }

        console.log(invalidIDs);
        let invalidIDTotal = addAllInvalidIDs(invalidIDs);
        console.log(invalidIDTotal);

    } catch (error) {
        console.error("Main error", error);
    }
}

const READ_FILE = './puzzle-input.txt';
main(READ_FILE);


// Attempts (Example.txt):
// 4174823709
// 4174379265   // Added break in the for loop to prevent the same number being counted multiple times


// Attempts (Puzzle.txt):
// 70187097315 (Answer!)