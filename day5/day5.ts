import fs from 'fs';

const input = fs.readFileSync('./input', {encoding:'utf8', flag:'r'});
const moves = input.split("\n");

const lineBreakIdx = moves.findIndex(x => x === '')!;
const setup = moves.slice(0, lineBreakIdx)

const moveList = moves.slice(lineBreakIdx+1)

const state: Array<Array<string>> = [];

for (let i = setup.length - 2; i >= 0; i--) {
    const line = setup[i];
    // console.log(setup[i]);
    for (let j = 0; j <= line.length; j+= 4) {
        const idx = j/4
        if (!state[idx]) state.push([])
        const elem = line.substr(j, 4).trim();
        if (elem !== '') {
            state[idx].push(line.substr(j, 4).replace('[', '').replace(']', '').trim())
        }
    }
}

const move = (source: number, destination: number) => {
    const value = state[source].pop()!;
    state[destination].push(value);
}

const moveAmount = (amount: number, source: number, destination: number) => {
    for(let i = 0; i < amount; i++) {
        move(source, destination);
    }
}


for (let i = 0; i < moveList.length; i++) {
    const moveRegex = /\d+/g;
    
    const moveData = moveList[i].match(moveRegex)//moveRegex.exec(moveList[i])!;
    // console.log(moveData);
    const [amount, source, destination] = moveData!.map(x => Number(x));
    // const amount = Number(moveData![1])
    // const source = Number(moveData![2])
    // const destination = Number(moveData![3])
    console.log(`move ${amount} from ${source} to ${destination}`)
    moveAmount(amount, source-1, destination-1);
}

console.log(state.flatMap(x => x[x.length-1]).join(''));