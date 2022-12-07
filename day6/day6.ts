import fs from 'fs';

const input = fs.readFileSync('./input', {encoding:'utf8', flag:'r'});

const rollingArr: Array<string> = [];

for (let i = 0; i < input.length; i++) {
    const char = input[i]
    rollingArr.push(char)
    if (rollingArr.length > 14) {
        rollingArr.shift();
    }

    const set = new Set(rollingArr)
    if (set.size === 14) {
        console.log(`first four unique are`)
        console.log(rollingArr)
        console.log(i+1)
        break;
    }
}