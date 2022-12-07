import fs from 'fs';

const input = fs.readFileSync('./input', {encoding:'utf8', flag:'r'});
const moves = input.split("\n");

const lineBreakIdx = moves.findIndex(x => x === '')!;
const setup = moves.slice(0, lineBreakIdx)

const moveList = moves.slice(lineBreakIdx+1)

const state: Array<Array<string>> = [];

for (let i = setup.length - 2; i >= 0; i--) {
    const line = setup[i];
    for (let j = 0; j <= line.length; j+= 4) {
        const idx = j/4
        if (!state[idx]) state.push([])
        const elem = line.substr(j, 4).trim();
        if (elem !== '') {
            state[idx].push(line.substr(j, 4).replace('[', '').replace(']', '').trim())
        }
    }
}

const moveAmount = (amount: number, source: number, destination: number) => {
    const sourceArr = state[source]
    const chunk = sourceArr.splice(sourceArr.length - amount, amount);
    state[destination].push(...chunk)
}

for (let i = 0; i < moveList.length; i++) {
    const moveRegex = /\d+/g;
    const moveData = moveList[i].match(moveRegex)
    const [amount, source, destination] = moveData!.map(x => Number(x));
    moveAmount(amount, source-1, destination-1);
}

console.log(state.flatMap(x => x[x.length-1]).join(''));