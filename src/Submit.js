import React, { Component } from 'react';
import './App.css';
import InputComp from './InputComp.js';
import home from './images/back.png';
import star from './images/star.png';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import {FirebaseApp} from "./FirebaseApp.js";

class Submit extends Component {

changeColor = () => {
  document.getElementById('nsfwbutton').style.color = "red";
  this.props.nsfwTag(true)
}

  render() {
    if (!this.props.loggedInUser) {
      return (
        <Redirect to="/" />
      );
    }
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
      <div id="nsfw">Tag as Explicit? <button id="nsfwbutton" onClick={this.changeColor}> &#10003; </button></div>
      <Link to="/Submission"><div id="center"> <button id="squareSubmitButton" onClick={this.props.submit}>Submit </button></div></Link>

    </div>
    );
  }
}

export default Submit;

// <img id="star1" className="star" src={star} alt="required"/>
// <img id="star2" className="star" src={star} alt="required"/>
// <img id="star3" className="star" src={star} alt="required"/>
// <img id="star4" className="star" src={star} alt="required"/>
// <img id="star5" className="star" src={star} alt="required"/>


// 
