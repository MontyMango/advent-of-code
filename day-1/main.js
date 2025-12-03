"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var process = require("process");
var fs = require("fs");
var readline = require("readline");
function createFileReader(FILE_TO_READ) {
    try {
        var fileStream = fs.createReadStream(FILE_TO_READ);
        return readline.createInterface({
            input: fileStream,
            output: process.stdout,
            terminal: false
        });
    }
    catch (error) {
        console.error("createFileReader error", error);
    }
}
function calculateDial(DIAL_TURN, dial, ticks) {
    var _a;
    var DIRECTION_TO_TURN = DIAL_TURN.charAt(0); // This will either be "R" or "L"
    var regexToUse = /[0-9]/g;
    var NUMBERS_TO_TURN = Number((_a = DIAL_TURN.match(regexToUse)) === null || _a === void 0 ? void 0 : _a.join("")); // Extract the number from DIAL_TURN
    var tmpDial = dial;
    var tmpTicks = ticks;
    var multiplier = 0;
    // console.log(tmpDial, DIRECTION_TO_TURN, DIAL_TURN.match(regexToUse)?.join(""));
    // If the direction were to be right, add the two numbers
    if (DIRECTION_TO_TURN == 'R') {
        // If the dial is pointing at the 0, add it to the tick.
        if (((tmpDial + NUMBERS_TO_TURN) % 100) == 0) {
            tmpDial = 0;
            tmpTicks++;
        }
        // Get the remainder
        else if (dial + NUMBERS_TO_TURN > 99) {
            do {
                multiplier++;
                // console.log(multiplier);
            } while ((dial + NUMBERS_TO_TURN) > (100 * (multiplier + 1)));
            tmpDial = (dial + NUMBERS_TO_TURN) - (100 * multiplier);
        }
        else {
            tmpDial = dial + NUMBERS_TO_TURN;
        }
    }
    // If the direction were to be left, subtract the two numbers
    else {
        // If the dial is pointing at the 0, add it to the tick.
        if (((tmpDial - NUMBERS_TO_TURN) % 100) == 0) {
            tmpDial = 0;
            tmpTicks++;
        }
        // Get the remainder
        else if (dial - NUMBERS_TO_TURN < 0) {
            do {
                multiplier++;
                // console.log(multiplier);
            } while ((NUMBERS_TO_TURN - dial) > (100 * (multiplier)));
            tmpDial = (dial - NUMBERS_TO_TURN) + (100 * multiplier);
        }
        else {
            tmpDial = dial - NUMBERS_TO_TURN;
        }
    }
    console.log("Current dial:", tmpDial, "Current ticks:", tmpTicks);
    return [tmpDial, tmpTicks];
}
function main(FILE_TO_USE) {
    try {
        var file = createFileReader(FILE_TO_USE);
        var dial_1 = 50;
        var totalTicks_1 = 0;
        file.on('line', function (line) {
            var _a;
            _a = calculateDial(line, dial_1, totalTicks_1), dial_1 = _a[0], totalTicks_1 = _a[1];
        });
        console.log("Password: ".concat(totalTicks_1));
    }
    catch (error) {
        console.error("Main error", error);
    }
}
var FILE = 'puzzle-input.txt';
main(FILE);
