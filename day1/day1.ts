import fs from 'fs';

const input = fs.readFileSync('./input', {encoding:'utf8', flag:'r'});
const calorieLog = input.split("\n");
let maxCalories = 0;
let localSumCalories = 0;

for (let i = 0; i <= calorieLog.length; i++) {
    const calorieEntry = calorieLog[i];
    if(calorieEntry === '' || i === calorieLog.length - 1) {
        console.log('newline')
        if (localSumCalories > maxCalories) {
            maxCalories = localSumCalories
        }
        localSumCalories = 0;
    } else {
        console.log(`adding ${calorieEntry} (${Number(calorieEntry)}) to localSum`)
        localSumCalories += Number(calorieEntry);
    }
}

console.log(`Max calories elf is ${maxCalories}`)