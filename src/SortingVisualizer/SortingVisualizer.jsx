import React from 'react';
import './SortingVisualizer.css';
import '../App.css'
import * as sortingAlgorithms from '../Algorithms/SortingAlgorithms';

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);
        this.DELAY_MS = 3;
        this.sorted = false;

        this.state = {
            array: [],
            currentlySorting: false,
        }
    }

    componentDidMount(){
        if(!this.state.currentlySorting) this.resetArray();
    }

    reset() {
        this.resetArray();
        this.resetColor();
        this.sorted = false;
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 0.8*(window.innerWidth/10-40); i++){
            array.push(randomIntFromInterval(5, window.innerHeight*0.6));
        }
        this.setState({array});
    }

    resetColor() {
        let domBoxArray = document.getElementsByClassName("array-bar");
        for (let l = 0; l < domBoxArray.length; l++) {
            domBoxArray[l].style.backgroundColor = "skyblue";
        }
    }

    mergeSort(){}

    quickSort(){}

    heapSort(){}

    bubbleSort(){
        if(this.sorted) return;
        this.setState({currentlySorting: true});
        let frame = 0;
        const animations = sortingAlgorithms.getBubbleSortAnimations(this.state.array.slice());
        for(let k = 0; k < animations.length; k++) {
            let domBoxArray = document.getElementsByClassName("array-bar");
            let animation = animations[k];
            let i = animation.compare[0];
            let j = animation.compare[1];
            if(animation.swap){
                setTimeout(()=>{
                    if(i>0 && j>0){
                        domBoxArray[i-1].style.backgroundColor = "skyblue";
                        domBoxArray[j-1].style.backgroundColor = "skyblue";
                    }
                    domBoxArray[i].style.backgroundColor = "red";
                    domBoxArray[j].style.backgroundColor = "red";
                }, this.DELAY_MS*frame);
                frame+=1;
                setTimeout(()=>{
                    let tempHeight1 = domBoxArray[i].style.height;
                    domBoxArray[i].style.height = domBoxArray[j].style.height;
                    domBoxArray[j].style.height = tempHeight1;
                    if(animation.sorted){
                        domBoxArray[i].style.backgroundColor = "lightgreen";
                        domBoxArray[j].style.backgroundColor = "lightgreen";
                    }
                }, this.DELAY_MS*frame);
                frame+=1;
            } else {
                setTimeout(()=>{
                    if(i>0 && j>0){
                        domBoxArray[i-1].style.backgroundColor = "skyblue";
                        domBoxArray[j-1].style.backgroundColor = "skyblue";
                    }
                    domBoxArray[i].style.backgroundColor = "lightgreen";
                    domBoxArray[j].style.backgroundColor = "lightgreen";
                }, this.DELAY_MS*frame);
                frame+=1;
            }
            if(animation.done){
                setTimeout(()=>{
                    for (let l = 0; l < domBoxArray.length; l++) {
                        domBoxArray[l].style.backgroundColor = "lightgreen";
                        this.setState({currentlySorting: false});
                        this.sorted = true;
                    }
                }, this.DELAY_MS*frame);
            }
        }
    }

    testAlgorithm(){
        for (let i = 0; i < 100; i++) {
            const array = [];
            for (let j = 0; j < randomIntFromInterval(1, 1000); j++) {
                array.push(randomIntFromInterval(-10000, 10000));
            }
            const testSortedArray = array.slice().sort((a, b) => a-b);
            const mySortedArray = sortingAlgorithms.bubbleSort(array.slice());
            console.log(arraysAreEqual(testSortedArray, mySortedArray));
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                <h1>Sorting Visualizer</h1>
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} 
                        style={{height: `${value}px`}}>
                    </div>
                ))}
                <br />
                <button className="visualizer-button" onClick={() => this.reset()} disabled={this.state.currentlySorting}>Reset</button>
                <button className="visualizer-button" onClick={() => this.mergeSort()} disabled={this.state.currentlySorting}>Merge Sort</button>
                <button className="visualizer-button" onClick={() => this.quickSort()} disabled={this.state.currentlySorting}>Quick Sort</button>
                <button className="visualizer-button" onClick={() => this.bubbleSort()} disabled={this.state.currentlySorting}>Bubble Sort</button>
                <button className="visualizer-button" onClick={() => this.heapSort()} disabled={this.state.currentlySorting}>Heap Sort</button>

            </div>
        );
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random()* (max-min+1)+min);
}

function arraysAreEqual(a1, a2){
    if (a1.length !== a2.length) return false;
    for (let i = 0; i < a1.length; i++) {
        if(a1[i]!==a2[i]) return false;
    }
    return true;
}