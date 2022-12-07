import fs from 'fs';

const input = fs.readFileSync('./input', {encoding:'utf8', flag:'r'});
const commands = input.split("\n");

type Command = {
    exec: string,
    args: string[]
}

enum NodeType {
    directory,
    file
}

type Node = {
    parent?: Node,
    children: Node[],
    size: number,
    type: NodeType,
    name: string
}

const isCommand = (input: string) => input.startsWith('$')

const parseCommand = (input: string): Command => {
    const [_prompt, exec, ...args] = input.split(' ');
    return {
        exec,
        args
    }
}

const rootNode: Node = {
    name: '/',
    children: [],
    size: 0,
    type: NodeType.directory
}

let currNode: Node = rootNode;
let nodeList: Node[] = [rootNode];
let nodeLookup: Map<string, Node> = new Map<string, Node>();
nodeLookup.set('/', rootNode)



const getCwd = (node: Node): string => {
    let cwd = node.name;
    if (node.parent) {
        cwd += `${getCwd(node.parent)}`;
    }
    return cwd;
}

const createDirNode = (name: string) => {
    const newNode: Node = {
        name,
        parent: currNode, 
        children: [],
        type: NodeType.directory,
        size: 0
    }
    currNode.children.push(newNode)
    nodeLookup.set(name, newNode)
    nodeList.push(newNode)
    return newNode;
}

const addFileSizeToParents = (targetNode: Node, fileNode: Node) => {
    if (targetNode.type !== NodeType.directory || fileNode.type !== NodeType.file) {
        console.error(`tried to add file size of ${fileNode.type} to a ${targetNode.type}`)
        return;
    }

    targetNode.size += fileNode.size;
    if (targetNode.parent) {
        addFileSizeToParents(targetNode.parent, fileNode)
    }
}

const createFileNode = (name: string, size: number): Node => {
    let newCwd = `${currNode ? getCwd(currNode) : ''}${name}`
    const lookup = nodeLookup.get(newCwd)
    if (lookup) {
        console.log(`found already existing file at ${newCwd}`)
        return lookup;
    }
    console.log(`Found file ${newCwd} with size ${size}`)
    const newNode: Node = {
        name: newCwd,
        // parent: currNode,
        children: [],
        type: NodeType.file,
        size
    }
    nodeList.push(newNode);
    currNode.children.push(newNode)
    nodeLookup.set(newCwd, newNode)
    console.log(`node ${currNode.name} now has ${currNode.children.length} children`)
    addFileSizeToParents(currNode, newNode)
    return newNode;
}

const handleCd = (command: Command) => {
    console.log(`got cd to ${command.args[0]}`)
    const path = command.args[0]

    if (path === '/') {
        currNode = rootNode;
        return;
    }

    // Going up a level
    if (path === '..') {
        if (!currNode.parent) {
            console.error(`Trying to move up a dir from ${currNode.name}!`)
            return
        }
        currNode = currNode.parent;
        return
    }

    // Entering a level
    let newCwd = `${currNode ? getCwd(currNode) : ''}${path}/`
    // If we've been here before
    const lookup = nodeLookup.get(newCwd)
    if (lookup) {
        console.log(`found already existing dir at ${newCwd}`)
        // Then we don't have to do extra work, we know how to get there
        currNode = lookup
    } else {
        console.log(`creating new node at ${newCwd}`)
        // If we haven't been here before, create the node
        // add it to the map, the list, and set the new currNode
        const newNode = createDirNode(newCwd)
        currNode = newNode;
    }
}

const parseLs = (input: string) => {
    const [type, name] = input.split(' ')
    if (type === 'dir') {
        createDirNode(name);
    } else {
        createFileNode(name, Number(type))
    }
}

for (let i = 0; i < commands.length; i++) {
    console.log(`Parsing ${commands[i]}`)
    if (isCommand(commands[i])) {
        const cmd = parseCommand(commands[i])
        if (cmd.exec === 'cd') {
            handleCd(cmd)
        }
    } else {
        parseLs(commands[i])
    }
}


const printNode = (node: Node, indent: number = 0) => {
    console.log(`${' '.repeat(indent)}${node.type === NodeType.directory ? 'DIR:' : 'FILE:'} ${node.name} (${node.size})`)
    if (node.children.length) {
        console.log(`${' '.repeat(indent)}children:`)
        node.children.forEach(x => {
            if(x.type === NodeType.directory) {
                printNode(x, indent+2)
            } else {
                // console.log(x);

                console.log(`${' '.repeat(indent+2)}FILE: ${x.name} (${x.size})`)
            }
        })
    }
}

const getNodesWithSize = (maxSize: number) => {
    let totalSize = 0;
    nodeLookup.forEach((node: Node, path: string) => {
        if (node.type === NodeType.directory && node.size <= maxSize) {
            totalSize += node.size;
        }
    })
    return totalSize;
}

const getNodesAboveSize = (minSize: number): Node[] => {
    let nodes: Node[] = [];
    nodeLookup.forEach((node: Node, path: string) => {
        if (node.type === NodeType.directory && node.size >= minSize) {
            nodes.push(node);
        }
    })
    return nodes;
}

const totalDiskSpace = 70000000;
const totalDiskSpaceUsed = rootNode.size;
const freeDiskSpace = totalDiskSpace - totalDiskSpaceUsed
const neededDiskSpace = 30000000
const diskSpaceWeNeedToFree = neededDiskSpace - freeDiskSpace

const nodesToDelete = getNodesAboveSize(diskSpaceWeNeedToFree);

const node = nodesToDelete.reduce((prev, curr) => {
    if (prev === null) {
        return curr;
    }
    if (prev.size > curr.size) {
        return curr;
    }

    return prev;
}, null as Node | null)

console.log(node!.size)

console.log(`We are using ${totalDiskSpaceUsed} out of ${totalDiskSpace}, free is ${freeDiskSpace} and we need ${neededDiskSpace} so we need to free ${diskSpaceWeNeedToFree}`)
// 19783544
// 30000000

// console.log(getNodesWithSize(100000))

// printNode(rootNode)

// fs.writeFileSync('./output', JSON.stringify(rootNode, null, 4))