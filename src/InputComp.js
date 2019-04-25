import React, { Component } from 'react';
import './App.css';

class InputComp extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentName: "",
    }
  }

  // updateName = (event) => {
  //   this.setState({
  //     currentName: event.target.value
  //   });
  // }
  submitName = (event) => {
    this.props.change(event.target.value, this.props.label);
  }

  render() {
    return (
      <div className="inputComp">
        <input className="input" placeholder={this.props.placeholder} onChange={this.submitName}></input>
      </div>
      // how to make one submit button for both name and pledge inputs
    );
  }
}

export default InputComp;
