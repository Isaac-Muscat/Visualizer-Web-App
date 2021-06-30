import React from 'react';
import './Node.css';

export default class Node extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return <div id={`${this.props.coords[0]}, ${this.props.coords[1]}`} className={`node node-${this.props.type}`}></div>
    }
}