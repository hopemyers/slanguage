import React, { Component } from 'react';
import './App.css';
import home from './images/back.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Random extends Component {



  render() {
    return (
      <div className="box">
      <p id="center" id="line1"> Word of the day </p>
      <p id="line1"><b>电灯泡</b></p>
      <p><b>Pinyin:</b> Diàn dēng pào</p>
      <p><b>English Definition: </b>Third wheel, unwanted third party on a date</p>
      <p><b>Chinese Example Sentence: </b> 我跟她和她的男朋友去看一个电影，我就是一个电灯泡</p>
      <p><b>English Example Sentence: </b> I went with her and her boyfriend to see a movie, I was third wheeling</p>
      <p id="centerpic"> <img className="picture" alt="picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH0rLhgDTpVAOywZ25psvip8P9R4SQkyfwIJ20UZxUT_tVnkUYhg"></img></p>
      </div>
    )
    }
}

export default Random;
