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
  // let randomNumber =  Math.floor(Math.random() * this.props.slang.length);
  // this.setState({chosenSlang: this.props.slang[randomNumber]})
  // let randomSlang = Object.keys(this.state.chosenSlang);
  console.log(this.props.slang)
}

  render() {
    return (
      <div className="randomWordBox">
      <p id="center" id="wordOfTheDay"> Word of the day </p>
      <p id="line1"><b>{this.props.slang.chinese}</b></p>
      <p><b>Pinyin: </b>{this.props.slang.pinyin}</p>
      <p><b>English Definition: </b>{this.props.slang.english}</p>
      <p><b>Chinese Example Sentence: </b> {this.props.slang.chineseSentence}</p>
      <p><b>English Example Sentence: </b> {this.props.slang.englishSentence} </p>
      {this.props.slang.pictureURL ? <p id="centerpic"> <img className="picture" alt="picture" src={this.props.slang.pictureURL}></img></p>: <p></p>}
      {this.props.slang.nsfw ? <div id="nsfwTag"> (Explicit) </div>:<p></p>}
      </div>
    )
    }
}

export default Random;
