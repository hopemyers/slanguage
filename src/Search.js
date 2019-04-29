import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentSearch: "",
      search: "",
  }
}

searchFunction = (event) => {
  this.setState({currentSearch: event.target.value})
}

searchWords = () => {
  this.setState({search: this.state.currentSearch})
}


render() {
  return (
    <div className="inputComp">
      <input className="searchinput" placeholder="Search..." onChange={this.searchFunction}></input>
      <div id="center"><button id="submitbutton" onClick={this.searchWords}>Search </button></div>
      <p id="ortext"> or </p>
      <div id="center"><Link to="/Submit"><button id="submitwordbutton">Submit A New Word</button></Link></div>
    </div>
);}
}

  export default Search;
