import React, { Component } from 'react';
import './App.css';
import home from './images/back.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Random extends Component {
  constructor(props){
    super(props);
    this.state = {
      chosenSlang: ''
    }
  }

componentDidMount() {
  let randomNumber =  Math.floor(Math.random() * this.props.slang.length);
  this.setState({chosenSlang: this.props.slang[randomNumber]})
  // let randomSlang = Object.keys(this.state.chosenSlang);
}

  render() {
    return (
      <div className="randomWordBox">
      <p id="center" id="wordOfTheDay"> Word of the day </p>
      <p id="line1"><b>{this.state.chosenSlang.chinese}</b></p>
      <p><b>Pinyin: </b>{this.state.chosenSlang.pinyin}</p>
      <p><b>English Definition: </b>{this.state.chosenSlang.english}</p>
      <p><b>Chinese Example Sentence: </b> {this.state.chosenSlang.chineseSentence}</p>
      <p><b>English Example Sentence: </b> {this.state.chosenSlang.englishSentence} </p>
      {this.state.chosenSlang.pictureURL ? <p id="centerpic"> <img className="picture" alt="picture" src={this.state.chosenSlang.pictureURL}></img></p>: <p></p>}
      {this.state.chosenSlang.nsfw ? <div id="nsfwTag"> NSFW </div>:<p></p>}

      </div>
    )
    }
}

export default Random;
