export function getDijkstraAnimations(nodes) {
    const animations = [];

    const unvisited = [];
    nodes.forEach(row => {
        row.forEach(node => {
            unvisited.push(node);
        });
    });

    unvisited.forEach(node => {
        node.distance = Infinity;
        if(node.type==="start") node.distance = 0;
    });

    while(unvisited.length!==0){
        unvisited.sort((n1, n2)=> n1.distance-n2.distance);
        const currentNode = unvisited.shift();
        //console.log(currentNode);

        if(!currentNode.visited){
            animations.push(currentNode);
            currentNode.visited=true;
        }

        if(currentNode.type==="end"||currentNode.distance===Infinity){
            return animations;
        }

        const nextNodes = getNeighbours(currentNode, nodes);
        nextNodes.forEach(node => {
            if(node.distance>currentNode.distance+1){
                node.distance = currentNode.distance+1;
                node.parent = currentNode;
            }
        });
    }
}


export function dijkstra(nodes) {
    const unvisited = [];
    nodes.forEach(row => {
        row.forEach(node => {
            unvisited.push(node);
        });
    });

    unvisited.forEach(node => {
        node.distance = Infinity;
        if(node.type==="start") node.distance = 0;
    });

    while(unvisited.length!==0){
        unvisited.sort((n1, n2)=> n1.distance-n2.distance);
        const currentNode = unvisited.shift();

        if(currentNode.type==="end") return currentNode;

        const nextNodes = getNeighbours(currentNode, nodes);
        nextNodes.forEach(node => {
            if(node.distance>currentNode.distance+1){
                node.distance = currentNode.distance+1;
                node.parent = currentNode;
            }
        });
    }
}

function getNeighbours(node, nodes){
    const neighbours = [];
    const{x, y} = node;
    if(x>0) neighbours.push(nodes[x-1][y]);
    if(x<nodes.length-1) neighbours.push(nodes[x+1][y]);
    if(y>0) neighbours.push(nodes[x][y-1]);
    if(y<nodes[0].length-1) neighbours.push(nodes[x][y+1]);
    return neighbours.filter(neighbour => neighbour.type !== "wall");
}