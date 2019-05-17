import React, { Component } from 'react';
import './App.css';
import search from './images/search.png';
import submit from './images/submit.png';
import browse from './images/browse.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from 'firebase';
import { withRouter } from 'react-router';



class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: "",
      currentSearch: "",
      search: "",
      error: ""
    }
  }

  searchFunction = (event) => {
    this.setState({ search: event.target.value });
    // this.setState({search: this.state.currentSearch});
  }

  searchWords = () => {
    this.props.term(this.state.search);
  }

  gotoSubmitPage = () => {
    if (this.state.loggedInUser) {
    } else {
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(this.onFirebaseAuthenticated)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(error);
        }
      );
    }
  }

  onFirebaseAuthenticated = (result) => {
    this.props.onAuthenticated(result.user);

    if (!result.user.email.match(/.*.edu$/)) {
      alert("You must have an edu email account to be able to submit.");
      this.setState({
        error: "You must have an edu email account to be able to submit."
      });
      return ;
    }

    //route them to the submit page
    this.props.history.push("/Submit");

    console.log(result.user);
  }


  render() {
    return (
      <div className="searchInputComp">

        { this.state.error && <p>{this.state.error}</p> }
        <input className="searchinput" placeholder="Search..." onChange={this.searchFunction}></input>
        <button id="submitbutton" onClick={this.searchWords}><img id="searchIcon" src={search} alt="search" /></button>
        <button id="submitwordbutton" onClick={this.gotoSubmitPage}><img id="submitIcon" src={submit} alt="submit new word" /></button>
        <Link to="/Browse"><button id="browsebutton"><img id="browseIcon" src={browse} alt="browse dictionary" /></button></Link>
      </div>
    );
  }
}

export default withRouter(Search);
