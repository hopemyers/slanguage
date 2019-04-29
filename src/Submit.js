import React, { Component } from 'react';
import './App.css';
import InputComp from './InputComp.js';
import home from './images/home.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Submit extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     currentName: "",
  //   }
  // }

  // updateName = (event) => {
  //   this.setState({
  //     currentName: event.target.value
  //   });
  // }


  render() {
    return (
      <div>
      <Link to="/"><img id="homebutton" src={home} alt="home"/></Link>
      <p id="description"> Submit a new word or phrase:</p>

      <InputComp change={this.props.change} label='chinese' placeholder="Chinese characters..."></InputComp>
      <InputComp change={this.props.change} label='pinyin' placeholder="Pinyin..."></InputComp>
      <InputComp change={this.props.change} label='english' placeholder="English..."></InputComp>
      <InputComp change={this.props.change} label='chineseSentence' placeholder="Chinese example sentence..."></InputComp>
      <InputComp change={this.props.change} label='englishSentence' placeholder="English sentence translation..."></InputComp>
      <InputComp change={this.props.change} label="pictureURL" placeholder="Picture URL..."></InputComp>

      <div id="center"> <button id="submitbutton" onClick={this.props.submit}>Submit </button></div>
    </div>
    );
  }
}




export default Submit;
