const { findMaxVoltage, addSumsTogether } = require('../../2025/day-3/day3-p2');

test('Find max voltage for 987654321111111', async () => {
    await expect(findMaxVoltage('987654321111111')).resolves.toBe(987654321111);
});
test('Find max voltage for 811111111111119', async () => {
    await expect(findMaxVoltage('811111111111119')).resolves.toBe(811111111119);
});
test('Find max voltage for 234234234234278', async () => {
    await expect(findMaxVoltage('234234234234278')).resolves.toBe(434234234278);
});
test('Find max voltage for 818181911112111', async () => {
    await expect(findMaxVoltage('818181911112111')).resolves.toBe(888911112111);
});
// test('See if Max voltage can be added up', async () =>  {
//     const array = [987654321111, 811111111119, 434234234278, 888911112111]

//     await expect(addSumsTogether(array).resolves.toBe(3121910778619));
//     // await expect(addSumsTogether([987654321111, 811111111119, 434234234278, 888911112111]).resolves.toBe(3121910778619));
// });