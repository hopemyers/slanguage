import React, { Component } from 'react';
import './App.css';

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
      <input className="input" placeholder="Search..." onChange={this.searchFunction}></input>
      <div id="center"><button id="submitbutton" onClick={this.searchWords}>Search </button></div>
    </div>
);}
}

  export default Search;
