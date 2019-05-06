import React, { Component } from 'react';
import './App.css';
import Headline from './Headline.js';
import Submit from './Submit.js';
import Search from './Search.js';
import Browse from './Browse.js';
import Random from './Random.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import * as firebase from 'firebase';
var app = firebase.initializeApp({
    apiKey: "AIzaSyDhUxeO5qWbw16nCfApKkObr4_ULEcduJk",
    authDomain: "slanguage-dictionary.firebaseapp.com",
    databaseURL: "https://slanguage-dictionary.firebaseio.com",
    projectId: "slanguage-dictionary",
    storageBucket: "slanguage-dictionary.appspot.com",
    messagingSenderId: "953574413174"
  });

class App extends Component {

// state goes here

  constructor(props){
    super(props);
    this.state = {
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
      currentPinyin:'',
      currentEnglish: '',
      currentChineseSentence: '',
      currentEnglishSentence: '',
      currentURL: '',
      currentNsfw: false,
      searchResult: []
      // history of word?
      // tags like urban dictionary?
    }
  }

  // functions go Here

  showNames = () => {
      return Object.keys(this.state.newSlang).map((slang) => {
        const slangs = this.state.newSlang;
        slang = slangs[slang];
        return(
        <div className="box">
          <p id="line1"><b>{slang.chinese}</b></p>
          <p><b>Pinyin: </b> {slang.pinyin}</p>
          <p><b>English Definition: </b>{slang.english}</p>
          <p><b>Chinese Example Sentence: </b> {slang.chineseSentence}</p>
          <p><b>English Example Sentence: </b> {slang.englishSentence}</p>
          {slang.pictureURL ? <p id="centerpic"> <img className="picture" alt="picture" src={slang.pictureURL}></img></p>: <p></p>}
          {slang.nsfw ? <div id="nsfwTag"> (NSFW) </div>:<p></p>}
        </div>
      )
      }
    );
  }

  showSearchResults = (searching) => {






    // console.log(Object.keys(this.state.newSlang));

    let slangFilter = this.state.newSlang;
    console.log(slangFilter);
    const filteredResults = Object.keys(this.state.newSlang).filter(key => this.searchQuery(searching, this.state.newSlang[key].english) ).map(key => {
      return this.state.newSlang[key]
    })
    console.log(filteredResults);
    console.log(filteredResults);
    this.setState({ searchResult: filteredResults})
    console.log(searching)
  }



searchQuery = (query, potentialMatch) => {
    let potMatchMinusPct = potentialMatch.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

    query = query.toLowerCase().replace(/[.,\/#!$@?%\^&\*;:{}=\-_`~()]/g,"").split(" ");

    let match = true;
    for(let i = 0; i < query.length; i++){
      let currentWord = query[i];
      if(potMatchMinusPct.indexOf(currentWord) == -1){
        return false;
      }
      if(i == query.length -1){
        return true;
      }
    }
  }



  renderSearchResults = () => {

    return this.state.searchResult.map((slang) => {
        return(
          <div className="box">
            <p id="line1"><b>{slang.chinese}</b></p>
            <p><b>Pinyin: </b> {slang.pinyin}</p>
            <p><b>English Definition: </b>{slang.english}</p>
            <p><b>Chinese Example Sentence: </b> {slang.chineseSentence}</p>
            <p><b>English Example Sentence: </b> {slang.englishSentence}</p>
            {slang.pictureURL ? <p id="centerpic"> <img className="picture" alt="picture" src={slang.pictureURL}></img></p>: <p></p>}
            {slang.nsfw ? <div id="nsfwTag"> (NSFW) </div>:<p></p>}
          </div>
        )
      }
    );


    // const slang = this.state.searchResult;
    // console.log(this.state.searchResult);

    //   if (this.state.searchResult.english !== null){
    //     return(
    //   <div className="box">
    //     <p id="line1"><b>{slang.chinese}</b></p>
    //     <p><b>Pinyin: </b> {slang.pinyin}</p>
    //     <p><b>English Definition: </b>{slang.english}</p>
    //     <p><b>Chinese Example Sentence: </b> {slang.chineseSentence}</p>
    //     <p><b>English Example Sentence: </b> {slang.englishSentence}</p>
    //     {slang.pictureURL ? <p id="centerpic"> <img className="picture" alt="picture" src={slang.pictureURL}></img></p>: <p></p>}
    //     {slang.nsfw ? <div id="nsfwTag"> NSFW </div>:<p></p>}
    //   </div>
    // )
    //   }
  }

addThings = (message, label) => {
  if(label==="chinese"){
    this.setState({currentChinese: message})
  }
  else if (label==="pinyin") {
    this.setState({currentPinyin: message})
  }
  else if (label==="english") {
    this.setState({currentEnglish: message})
  }
  else if (label==="chineseSentence") {
    this.setState({currentChineseSentence: message})
  }
  else if (label==="englishSentence") {
    this.setState({currentEnglishSentence: message})
  }
  else if (label==="pictureURL") {
    this.setState({currentURL: message})
  }
}

nsfwState = (isItNsfw) => {
  this.setState({currentNsfw: isItNsfw});
  console.log(isItNsfw);
}

submitThings = () => {
  let newArray = {chinese: this.state.currentChinese, pinyin: this.state.currentPinyin, english: this.state.currentEnglish, chineseSentence: this.state.currentChineseSentence, englishSentence: this.state.currentEnglishSentence, pictureURL: this.state.currentURL, nsfw: this.state.currentNsfw}

  // let slangArray = this.state.newSlang.concat(newArray);
  // this.setState({newSlang: slangArray})
  // debugger;
  firebase.database().ref("single-value").push(newArray);
  alert("Thank you for submitting a new word! Try looking it up in the dictionary :)");

}

componentDidMount() {
  firebase.database().ref("single-value").on("value", (snapshot) => {
    // console.log(snapshot.val());
    this.setState({
      newSlang: snapshot.val()
    })
  });
}

  renderSubmit = () => {
    return <Submit change={this.addThings} submit={this.submitThings} nsfwTag={this.nsfwState}> </Submit>
  }

  searchPage = () => {
    return <div><Search term={this.showSearchResults}></Search>
   {this.renderSearchResults()}
   <Random slang={this.state.newSlang}></Random>
  </div>
  }

  browseWords = () => {
    return <Browse showNames={this.showNames}></Browse>
  }

  render() {
    return (
        <Router>
          <div className="App">


            <Headline text={"Slanguage"} change={this.submissionPage}></Headline>



            <Route path="/" exact component={this.searchPage} />
            <Route path="/Headline" exact component={Headline} />

            <Route path="/Submit" exact component={ this.renderSubmit } />
            <Route path="/Browse" exact component={this.browseWords}/>

            <div id="bottombar">
                  <p id="copyright"> &#9400; NYU Shanghai</p>
                  </div>

          </div>

        </Router>
        );
      }
    }

export default App;




// <div className="App">
//
//
//
//   <Headline text={"Slanguage"} change={this.submissionPage}></Headline>
//
//
//     <Search></Search>
//
//       <div className="display">
//       {this.showNames()}
//       </div>
//
//       <div id="bottombar">
//       <p id="copyright"> &#9400; NYU Shanghai</p>
//       </div>
//
//     </div>
