import fs from 'fs';

const input = fs.readFileSync('./input', {encoding:'utf8', flag:'r'});
const matches = input.split("\n");


let score = 0;

// A = Rock, B = Paper, C = Scissors
// X = Rock, Y = Paper, Z = scissors
// X is lose, Y is draw, Z is win

enum OpponentPlay {
    Rock = "A",
    Paper = "B",
    Scissors = "C"
}

enum Play {
    Rock = "X",
    Paper = "Y",
    Scissors = "Z"
}

enum Outcome {
    Lose = "X",
    Draw = "Y",
    Win = "Z"
}

const scoreMap: any = {
    [Play.Rock]: 1,
    [Play.Paper]: 2,
    [Play.Scissors]: 3
}

const counterPlays: any = {
    [OpponentPlay.Rock]: {
        [Outcome.Lose]: Play.Scissors,
        [Outcome.Draw]: Play.Rock,
        [Outcome.Win]: Play.Paper,
    },
    [OpponentPlay.Paper]: {
        [Outcome.Lose]: Play.Rock,
        [Outcome.Draw]: Play.Paper,
        [Outcome.Win]: Play.Scissors
    },
    [OpponentPlay.Scissors]: {
        [Outcome.Lose]: Play.Paper,
        [Outcome.Draw]: Play.Scissors,
        [Outcome.Win]: Play.Rock
    }
}

const playPoints: any = {
    [Outcome.Lose]: 0,
    [Outcome.Draw]: 3,
    [Outcome.Win]: 6
}


let countPlaysText: any = {
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors'
}

let opponentPlayTextMap: any = {
    A: "Rock",
    B: "Paper",
    C: "Scissors"
}

let playTextMap: any = {
    X: "Lose",
    Y: "Draw",
    Z: "Win"
}

for (let i = 0; i < matches.length; i++) {
    let [opponent, me] = matches[i].split(' ');
    if (opponent === undefined || me === undefined) continue;
    score += playPoints[me];
    score += scoreMap[counterPlays[opponent][me]]
    console.log(counterPlays[opponent][me])
    console.log(`[${playTextMap[me]}]: Op: ${opponentPlayTextMap[opponent]} (${opponent}), I play ${countPlaysText[counterPlays[opponent][me]]} (${counterPlays[opponent][me]}) = Play: ${scoreMap[counterPlays[opponent][me]]} + Outcome: ${playPoints[me]} = ${scoreMap[counterPlays[opponent][me]] + playPoints[me]}`)
}

console.log(score);