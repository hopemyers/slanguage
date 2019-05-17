import React, { Component } from 'react';
import './App.css';
import Headline from './Headline.js';
import Submit from './Submit.js';
import Search from './Search.js';
import Browse from './Browse.js';
import Random from './Random.js';
import Submission from './Submission.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FirebaseApp } from "./FirebaseApp.js";

import * as firebase from 'firebase';
var app = FirebaseApp;

class App extends Component {

  // state goes here

  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      newSlang: [
        {
          chinese: "小鲜肉",
          pinyin: "Xiǎo xiānròu",
          english: 'Young handsome boy',
          chineseSentence: '昨天我看到一个小鲜肉，好帅！',
          englishSentence: "Yesterday, I saw a young handsome boy, and he is so gorgeous!",
          pictureURL: '',
          nsfw: false
        },
      ],
      currentChinese: '',
      currentPinyin: '',
      currentEnglish: '',
      currentChineseSentence: '',
      currentEnglishSentence: '',
      currentURL: '',
      currentNsfw: false,
      searchResult: [null],
      wordOfTheDay: ''
      // history of word?
      // tags like urban dictionary?
    }
  }

  // functions go Here

  showNames = () => {
    return Object.keys(this.state.newSlang).map((slang) => {
      const slangs = this.state.newSlang;
      slang = slangs[slang];
      return (
        <div className="box">
          <p id="line1"><b>{slang.chinese}</b></p>
          <p><b>Pinyin: </b> {slang.pinyin}</p>
          <p><b>English Definition: </b>{slang.english}</p>
          {slang.chineseSentence ? <p><b>Chinese Example Sentence: </b> {slang.chineseSentence}</p> : <p></p>}
          {slang.englishSentence ? <p><b>English Example Sentence: </b> {slang.englishSentence}</p> : <p></p>}
          {slang.pictureURL ? <p id="centerpic"> <img className="picture" alt="picture" src={slang.pictureURL}></img></p> : <p></p>}
          {slang.nsfw ? <p id="nsfwTag"> (Explicit) </p> : <p></p>}
        </div>
      )
    }
    );
  }

  showSearchResults = (searching) => {

    let slangFilter = this.state.newSlang;
    console.log(slangFilter);
    const filteredResults = Object.keys(this.state.newSlang).filter(key => this.searchQuery(searching, this.state.newSlang[key].english)).map(key => {
      return this.state.newSlang[key]
    })
    console.log(filteredResults);
    console.log(filteredResults);
    this.setState({ searchResult: filteredResults })
    console.log(searching)
  }

  searchQuery = (query, potentialMatch) => {
    let potMatchMinusPct = potentialMatch.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    query = query.toLowerCase().replace(/[.,\/#!$@?%\^&\*;:{}=\-_`~()]/g, "").split(" ");

    let match = true;
    for (let i = 0; i < query.length; i++) {
      let currentWord = query[i];
      if (potMatchMinusPct.indexOf(currentWord) == -1) {
        return false;
      }
      if (i == query.length - 1) {
        return true;
      }
    }
  }

  renderSearchResults = () => {
    if (this.state.searchResult[0] === null) {
      return;
    }
    else if (this.state.searchResult.length === 0) {
      return (
        <div id="noResults"> This word is not currently in the dictionary, if you know a definition feel free to add it! </div>
      )
    }
    else {
      return this.state.searchResult.map((slang) => {
        return (
          <div className="box">
            <p id="line1"><b>{slang.chinese}</b></p>
            <p><b>Pinyin: </b> {slang.pinyin}</p>
            <p><b>English Definition: </b>{slang.english}</p>
            {slang.chineseSentence ? <p><b>Chinese Example Sentence: </b> {slang.chineseSentence}</p> : <p></p>}
            {slang.englishSentence ? <p><b>English Example Sentence: </b> {slang.englishSentence}</p> : <p></p>}
            {slang.pictureURL ? <p id="centerpic"> <img className="picture" alt="picture" src={slang.pictureURL}></img></p> : <p></p>}
            {slang.nsfw ? <div id="nsfwTag"> (Explicit) </div> : <p></p>}
          </div>
        )
      }
      );
    }
  }

  addThings = (message, label) => {
    if (label === "chinese") {
      this.setState({ currentChinese: message })
    }
    else if (label === "pinyin") {
      this.setState({ currentPinyin: message })
    }
    else if (label === "english") {
      this.setState({ currentEnglish: message })
    }
    else if (label === "chineseSentence") {
      this.setState({ currentChineseSentence: message })
    }
    else if (label === "englishSentence") {
      this.setState({ currentEnglishSentence: message })
    }
    else if (label === "pictureURL") {
      this.setState({ currentURL: message })
    }
  }

  nsfwState = (isItNsfw) => {
    this.setState({ currentNsfw: isItNsfw });
    console.log(isItNsfw);
  }

  submitThings = () => {
    if (!this.state.loggedInUser) {
      return ;
    }
    
    let newArray = {
      chinese: this.state.currentChinese,
      pinyin: this.state.currentPinyin,
      english: this.state.currentEnglish,
      chineseSentence: this.state.currentChineseSentence,
      englishSentence: this.state.currentEnglishSentence, 
      pictureURL: this.state.currentURL,
      nsfw: this.state.currentNsfw,
      submittedBy: this.state.loggedInUser.email
    }

    // let slangArray = this.state.newSlang.concat(newArray);
    // this.setState({newSlang: slangArray})
    // debugger;
    firebase.database().ref("single-value").push(newArray);
  }

  componentDidMount() {
    firebase.database().ref("single-value").on("value", (snapshot) => {
      console.log(snapshot.val());
      let slangArray = Object.keys(snapshot.val()).map(key => {
        return snapshot.val()[key]
      })

      //get word of the day fro database (LATER in v2)
      //check if day of word of the day is still today (LATER)

      // if yes, store word of the day to APp.js state (LATER)

      //if not, pic word of the day from array we just created

      //push word of the day to database (LATER)

      // store word of the day to App.js state

      // (pass word of the day to Random.js component)

      let randomNumber = Math.floor(Math.random() * slangArray.length);
      this.setState({ wordOfTheDay: slangArray[randomNumber] })
      //console.log(this.state.wordOfTheDay)

      console.log(slangArray)
      this.setState({
        newSlang: slangArray
      })
    });
  }

  renderSubmit = () => {
    return <Submit change={this.addThings} submit={this.submitThings} nsfwTag={this.nsfwState} loggedInUser={this.state.loggedInUser}> </Submit>
  }

  searchPage = () => {
    return (
      <div>
        <Search term={this.showSearchResults} onAuthenticated={this.onAuthenticated}></Search>
        {this.renderSearchResults()}
        <Random slang={this.state.wordOfTheDay}></Random>
      </div>
    )
  }

  onAuthenticated = (user) => {
    this.setState({
      loggedInUser: user
    });
  }

  browseWords = () => {
    return <Browse showNames={this.showNames}></Browse>
  }

  submissionComplete = () => {
    return <Submission></Submission>
  }

  render() {
    return (
      <Router>
        <div className="App">


          <Headline text={"Slanguage"} change={this.submissionPage}></Headline>

          <Route path="/" exact component={this.searchPage} />
          <Route path="/Headline" exact component={Headline} />

          <Route path="/Submit" exact component={this.renderSubmit} />
          <Route path="/Browse" exact component={this.browseWords} />
          <Route path="/Submission" exact component={this.submissionComplete} />

          <div id="bottombar">
            <p id="copyright"> &#9400; 2019 Slanguage</p>
          </div>

        </div>

      </Router>
    );
  }
}

export default App;
