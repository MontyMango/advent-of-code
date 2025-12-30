"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMaxVoltage = findMaxVoltage;
exports.addSumsTogether = addSumsTogether;
// import createFileReader from '../common_modules';
var fs = require('fs');
var readline = require('readline');
var lineRead = 0;
function createFileReader(FILE_TO_READ) {
    return __awaiter(this, void 0, void 0, function () {
        var fileStream;
        return __generator(this, function (_a) {
            try {
                fileStream = fs.createReadStream(FILE_TO_READ);
                return [2 /*return*/, readline.createInterface({
                        input: fileStream,
                        output: process.stdout,
                        terminal: false
                    })];
            }
            catch (error) {
                console.error("createFileReader error", error);
            }
            return [2 /*return*/];
        });
    });
}
function createNumber(numberArray) {
    var totalJoltage = 0;
    for (var i = 0; i < numberArray.length; i++) {
        totalJoltage = (totalJoltage * 10) + numberArray[i];
    }
    return totalJoltage;
}
// Split the string IDs and convert them into a number when returning them.
function findMaxVoltage(voltageString) {
    return __awaiter(this, void 0, void 0, function () {
        var joltageBank, MAX_JOLTAGE_DIGITS, i, currentNumber, lastNumberPutIn, emptySlotsInJoltageBank, remainingNumbersInString, maxJoltage;
        return __generator(this, function (_a) {
            joltageBank = [Number(voltageString[0])];
            MAX_JOLTAGE_DIGITS = 12;
            // Start at the first 
            for (i = 1; i < voltageString.length; i++) {
                currentNumber = Number(voltageString[i]);
                lastNumberPutIn = joltageBank[joltageBank.length - 1];
                emptySlotsInJoltageBank = MAX_JOLTAGE_DIGITS - joltageBank.length;
                remainingNumbersInString = voltageString.length - i;
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
                if (lastNumberPutIn < currentNumber && remainingNumbersInString > emptySlotsInJoltageBank) {
                    joltageBank[joltageBank.length - 1] = currentNumber;
                }
                // ADD THE DIGIT TO THE END OF THE BANK IF ALL ELSE FAILS
                // If we have the space, we will place this at the end
                else if (joltageBank.length < MAX_JOLTAGE_DIGITS) {
                    joltageBank.push(currentNumber);
                }
            }
            maxJoltage = createNumber(joltageBank);
            return [2 /*return*/, maxJoltage];
        });
    });
}
// TODO: Possibly convert to a common module?
function addSumsTogether(sums) {
    var total = 0;
    for (var i = 0; i < sums.length; i++) {
        var currentNumber = sums[i];
        total += currentNumber;
    }
    return total;
}
function main(FILE_TO_USE) {
    return __awaiter(this, void 0, void 0, function () {
        var BANKS, banksToKeep, _a, BANKS_1, BANKS_1_1, currentBankString, _b, _c, e_1_1, jotageTotal, error_1;
        var _d, e_1, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 16, , 17]);
                    return [4 /*yield*/, createFileReader(FILE_TO_USE)];
                case 1:
                    BANKS = _g.sent();
                    banksToKeep = [];
                    _g.label = 2;
                case 2:
                    _g.trys.push([2, 8, 9, 14]);
                    _a = true, BANKS_1 = __asyncValues(BANKS);
                    _g.label = 3;
                case 3: return [4 /*yield*/, BANKS_1.next()];
                case 4:
                    if (!(BANKS_1_1 = _g.sent(), _d = BANKS_1_1.done, !_d)) return [3 /*break*/, 7];
                    _f = BANKS_1_1.value;
                    _a = false;
                    currentBankString = _f;
                    _c = (_b = banksToKeep).push;
                    return [4 /*yield*/, findMaxVoltage(currentBankString)];
                case 5:
                    _c.apply(_b, [_g.sent()]);
                    _g.label = 6;
                case 6:
                    _a = true;
                    return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _g.trys.push([9, , 12, 13]);
                    if (!(!_a && !_d && (_e = BANKS_1.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _e.call(BANKS_1)];
                case 10:
                    _g.sent();
                    _g.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14:
                    BANKS.close();
                    console.log(banksToKeep);
                    return [4 /*yield*/, addSumsTogether(banksToKeep)];
                case 15:
                    jotageTotal = _g.sent();
                    console.log(jotageTotal);
                    return [3 /*break*/, 17];
                case 16:
                    error_1 = _g.sent();
                    console.error("Main error", error_1);
                    return [3 /*break*/, 17];
                case 17: return [2 /*return*/];
            }
        });
    });
}
// If we request only this file to be ran, read the puzzle input.
// This should be ignored by the Jest tests
if (require.main === module) {
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var FILE_TO_READ, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    FILE_TO_READ = './puzzle-input.txt';
                    return [4 /*yield*/, main(FILE_TO_READ)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })();
}
// Attempts (Example.txt):
// Attempts (Puzzle.txt):
