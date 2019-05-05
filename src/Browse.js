import React, { Component } from 'react';
import './App.css';
import home from './images/back.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Browse extends Component {

  render() {
    return (
      <div>
      <Link to="/"><img id="homebutton" src={home} alt="home"/></Link>
        {this.props.showNames()}
      </div>
    )
    }
}

export default Browse;
