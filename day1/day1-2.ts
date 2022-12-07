import fs from 'fs';

const input = fs.readFileSync('./input', {encoding:'utf8', flag:'r'});
const calorieLog = input.split("\n");

let localSumCalories = 0;
const elfCalorieMap = [];

for (let i = 0; i <= calorieLog.length; i++) {
    const calorieEntry = calorieLog[i];
    if(calorieEntry === '' || i === calorieLog.length - 1) {
        elfCalorieMap.push(localSumCalories)
        localSumCalories = 0;
    } else if (calorieEntry !== undefined) {
        localSumCalories += Number(calorieEntry);
    }
}

const sorted = elfCalorieMap.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0)
console.log(sorted)