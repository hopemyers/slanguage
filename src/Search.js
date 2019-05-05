import React, { Component } from 'react';
import './App.css';
import search from './images/search.png';
import submit from './images/submit.png';
import browse from './images/browse.png';
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
  this.setState({search: event.target.value});
  // this.setState({search: this.state.currentSearch});
}

searchWords = () => {
  this.props.term(this.state.search);
}


render() {
  return (
    <div className="searchInputComp">
      <input className="searchinput" placeholder="Search..." onChange={this.searchFunction}></input>
      <button id="submitbutton" onClick={this.searchWords}><img id="searchIcon" src={search} alt="search"/></button>
      <Link to="/Submit"><button id="submitwordbutton"><img id="submitIcon" src={submit} alt="submit new word"/></button></Link>
      <Link to="/Browse"><button id="browsebutton"><img id="browseIcon" src={browse} alt="browse dictionary"/></button></Link>
    </div>
);}
}

  export default Search;
