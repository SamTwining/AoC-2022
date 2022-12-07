import fs from 'fs';

const input = fs.readFileSync('./input', {encoding:'utf8', flag:'r'});
const assignments = input.split("\n");

const createRangeArr = (start: number, end: number) => Array.from(Array(end-start + 1), (_,x) => x + start);

const arrContainsArr = (container: Array<number>, search: Array<number>): boolean => {
    return search.every(x => container.includes(x))
}

const intersect = <T>(setA: Set<T>, setB: Set<T>) => {
    const res = new Set<T>();

    for (const elem of setA) {
        if (setB.has(elem)) {
            res.add(elem);
        }
    }

    return res;
}

let fullOverlapCount = 0;
for (let i = 0; i < assignments.length; i++) {
    const [assignment1, assignment2] = assignments[i].split(',')
    const [a1Start, a1End] = assignment1.split('-').map(x => Number(x))
    const [a2Start, a2End] = assignment2.split('-').map(x => Number(x))

    const a1Range = new Set(createRangeArr(a1Start, a1End))
    const a2Range = new Set(createRangeArr(a2Start, a2End))

    const anyIntersect = intersect(a1Range, a2Range)

    if (anyIntersect.size > 0) {
        fullOverlapCount += 1;
    }
}

console.log(fullOverlapCount)