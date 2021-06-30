import React from 'react';
import Node from './Node/Node';
import * as pathfindingAlgorithms from '../Algorithms/PathfindingAlgorithms';

import "../App.css";
import "./PathfindingVisualizer.css";

export default class PathfindingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.DELAY_MS = 5;
        this.state = {
            nodes: [],
        };
    }

    componentDidMount() {
        this.resetNodes();
    }

    reset() {
        this.resetNodes();
        this.resetColor();
        this.sorted = false;
    }

    resetNodes() {
        const nodes = [];
        for (let i = 0; i < 15; i++) {
            const row = [];
            for (let j = 0; j < 30; j++) {
                const node = {
                    x: i,
                    y: j,
                    type: "",
                };
                row.push(node);
            }
            nodes.push(row);
        }
        nodes[5][0].type = "start";
        nodes[5][29].type = "end";
        this.setState({nodes});
    }

    resetColor() {
        let nodes = this.state.nodes;
        nodes.forEach(row => {
            row.forEach(node => {
                document.getElementById(`${node.x}, ${node.y}`).className = `node node-${node.type}`;
            });
        });
    }

    dijkstra() {
        let frames = 0;
        const nodesToAnimate = pathfindingAlgorithms.getDijkstraAnimations(this.state.nodes);
        for (let i = 0; i < nodesToAnimate.length; i++) {
            setTimeout(() => {
                const node = nodesToAnimate[i];
                document.getElementById(`${node.x}, ${node.y}`).className = "node node-visited";
            }, frames*this.DELAY_MS);
            frames++;
        }

        if(nodesToAnimate[nodesToAnimate.length-1].type==="end") this.getShortestPath(nodesToAnimate[nodesToAnimate.length-1]).forEach(nextNode=> {
            setTimeout(()=> {
                document.getElementById(`${nextNode.x}, ${nextNode.y}`).className = "node node-path";
            }, frames*this.DELAY_MS);
            frames++;
        });

        setTimeout(()=> {
            const start = nodesToAnimate[0];
            document.getElementById(`${start.x}, ${start.y}`).className = "node node-start";
        }, frames*this.DELAY_MS);
    }

    getShortestPath(endNode) {
        const path = [];
        let nextNode = endNode;
        while(nextNode.type !== "start"){
            console.log(nextNode);
            path.push(nextNode);
            nextNode = nextNode.parent;
        }
        return path;
    }

    render() {
        const {nodes} = this.state;
        return(
            <div>
                <h1>Pathfinding Visualizer</h1>
                <div className="grid">
                    {nodes.map((row, i) => {
                        return <div key={i}>
                            {row.map((node, j) => {
                                return(
                                    <Node coords={[i, j]} type={node.type} key={j}></Node>
                                );
                            })}
                        </div>
                    })}
                </div>
                <button className="visualizer-button" onClick={() => this.reset()}>Reset</button>
                <button className="visualizer-button" onClick={() => this.dijkstra()}>Dijkstra</button>
            </div>
        );
    }
}