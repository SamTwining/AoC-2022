import { match } from 'assert';
import fs from 'fs';

const input = fs.readFileSync('./input', {encoding:'utf8', flag:'r'});
const matches = input.split("\n");

let scoreMap: any = {
    X: 1,
    Y: 2,
    Z: 3
}

// A = Rock, B = Paper, C = Scissors
// X = Rock, Y = Paper, Z = scissors
let opponentPlayMap: any = {
    A: {
        X: 3,
        Y: 6,
        Z: 0
    },
    B: {
        X: 0,
        Y: 3,
        Z: 6
    },
    C: {
        X: 6,
        Y: 0,
        Z: 3
    }
}

let score = 0;

for (let i = 0; i < matches.length; i++) {
    let [opponent, me] = matches[i].split(' ');
    if (opponent === undefined || me === undefined) continue;
    console.log(`They played ${opponent}, I played ${me}, I get ${opponentPlayMap[opponent][me]}, and ${scoreMap[me]}`)
    score += opponentPlayMap[opponent][me];
    score += scoreMap[me];
}

console.log(score);