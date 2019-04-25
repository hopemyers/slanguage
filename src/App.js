import React, { Component } from 'react';
import './App.css';
import Headline from './Headline.js';
import InputComp from './InputComp.js';

class App extends Component {

// state goes here

  constructor(props){
    super(props);
    this.state = {
      newSlang: [
        {
          chinese: "吃土",
          pinyin: "Chī tǔ",
          english: 'broke, poor',
          chineseSentence: '我不去逛街了，最近要吃土了',
          englishSentence: "I can't go shopping, I've been broke recently"
        },
        {
          chinese: "小鲜肉",
          pinyin: "Xiǎo xiānròu",
          english: 'Young handsome boy',
          chineseSentence: '昨天我看到一个小鲜肉，好帅！',
          englishSentence: "Yesterday, I saw a young handsome boy, and he is so gorgeous!"
        },
        {
          chinese: "牛",
          pinyin: "Niú",
          english: 'Cool, awesome',
          chineseSentence: 'A:我这礼拜赚了一百万块。B: 你真牛',
          englishSentence: "A: I earned 1 million dollars this week. B: Wow, you are so cool."
        },
        {
          chinese: "萌",
          pinyin: "Méng",
          english: 'cute',
          chineseSentence: '这个女生真萌',
          englishSentence: "This girl is so cute"
        },
        {
          chinese: "戏精",
          pinyin: "Xìjīng",
          english: 'Drama queen, attention whore',
          chineseSentence: '身边有一群戏精朋友真的是让人崩溃',
          englishSentence: "Having a group of attention whores around really drives people crazy"
        },
      ],
      currentChinese: '',
      currentPinyin:'',
      currentEnglish: '',
      currentChineseSentence: '',
      currentEnglishSentence: '',
    }
  }

  // functions go Here

  showNames = () => {
      return this.state.newSlang.map((slang) => (
        <div className="box">
          <p id="line1"><b>{slang.chinese}</b></p>
          <p><b>Pinyin:</b> {slang.pinyin}</p>
          <p><b>English Definition: </b>{slang.english}</p>
          <p><b>Chinese Example Sentence: </b> {slang.chineseSentence}</p>
          <p><b>English Example Sentence: </b> {slang.englishSentence}</p>
        </div>
      ));
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
}

submitThings = () => {
  let newArray = {chinese: this.state.currentChinese, pinyin: this.state.currentPinyin, english: this.state.currentEnglish, chineseSentence: this.state.currentChineseSentence, englishSentence: this.state.currentEnglishSentence}
  let slangArray = this.state.newSlang.concat(newArray);
  this.setState({newSlang: slangArray})
}

  render() {
    return (
      <div className="App">

        <Headline text={"Slanguage"}></Headline>
        <p id="description"> Submit a new word or phrase:</p>

          <InputComp change={this.addThings} label='chinese' placeholder="Chinese characters..."></InputComp>
          <InputComp change={this.addThings} label='pinyin' placeholder="Pinyin..."></InputComp>
          <InputComp change={this.addThings} label='english' placeholder="English..."></InputComp>
          <InputComp change={this.addThings} label='chineseSentence' placeholder="Chinese example sentence..."></InputComp>
          <InputComp change={this.addThings} label='englishSentence' placeholder="English sentence translation..."></InputComp>

          <div id="center"> <button id="submitbutton" onClick={this.submitThings}>Submit </button></div>

            <div className="display">
            {this.showNames()}
            </div>

            <div id="bottombar">
            <p id="copyright"> &#9400; NYU Shanghai</p>
            </div>

          </div>
        );
      }
    }

export default App;
