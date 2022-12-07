import fs from 'fs';

const input = fs.readFileSync('./input', {encoding:'utf8', flag:'r'});
const rucksacks = input.split("\n");

const itemToPriority = (item: string) => item.charCodeAt(0) < 97 ? item.charCodeAt(0) - 38 : item.charCodeAt(0) - 96

// const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

// console.log(alphabet.split('').map(x => itemToPriority(x)))

const intersect = (setA: Set<string>, setB: Set<string>) => {
    const res = new Set<string>();

    for (const elem of setA) {
        if (setB.has(elem)) {
            res.add(elem);
        }
    }

    return res;
}

let commonItemsScore = 0;
for (let i = 0; i < rucksacks.length; i++) {
    const rucksack = rucksacks[i].split('')
    const firstCompartment = new Set(rucksack.slice(0, rucksack.length/2))
    const secondCompartment = new Set(rucksack.slice(rucksack.length/2))

    const commonBetweenCompartments = intersect(firstCompartment, secondCompartment)
    const commonArr = Array.from(commonBetweenCompartments)

    console.log(`Found ${commonArr.map(x => `${x} (${itemToPriority(x)})`).join(' ')} in both first and second compartment`);
    commonArr.forEach(x => commonItemsScore += itemToPriority(x))
}

console.log(commonItemsScore)