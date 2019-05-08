import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//EXPLANATION:

//This component is responsible for displaying
//the website's logo and headline. The content
//of the headline is passed down by the parent
//component (App). The "logo" is simply an empty
//div that we assign a width, height and background-color
//in the css stylesheet.

class Submission extends Component {


submitWord = () => {
  this.props.change();
}

  render() {
    return (
      <div className="submission">
        <p> Thank you for your contribution to Slanguage! </p>
        <Link to="/"><button id="goHomeButton"> Home </button></Link>
        <Link to="/Submit"><button id="anotherWordButton"> Submit another word </button></Link>
      </div>
    );
  }
}

export default Submission;
