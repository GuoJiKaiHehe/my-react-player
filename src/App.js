import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import PubSub from 'pubsub-js'

import Header from './components/common/Header'
import MusicList from './components/MusicList'
import Player  from './components/Player'

import {MUSIC_LIST} from './data/MusicList' //音乐数据；

import './App.css';
import  './styles/reset.css'
import './styles/common.css'
import './less/main.less'



class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      musicList:MUSIC_LIST,
      currentMusicItem:MUSIC_LIST[0]
    }
  }
  componentDidMount(){
    $('#player').jPlayer({
          supplied: 'mp3',
          wmode: 'window',
          useStateClassSkin: true
      });
    this.playMusic(this.state.currentMusicItem);
    PubSub.subscribe("PLAY_MUSIC",(msg,currentMusicItem)=>{
        this.playMusic(currentMusicItem);
    });
    PubSub.subscribe('DELETE_MUSIC', (msg, currentMusicItem) => {
          this.setState({
              musicList: this.state.musicList.filter(item => {
                  return item !== currentMusicItem
              })
          })
      });
      PubSub.subscribe('PLAY_PREV', (msg) => {
            this.playNext('prev')
      });

      PubSub.subscribe('PLAY_NEXT', (msg) => {
          this.playNext('next')
      });

  }
  playMusic(currentMusicItem){
      $('#player').jPlayer("setMedia",{
        mp3:currentMusicItem.file
      }).jPlayer('play');

      this.setState({
        currentMusicItem:currentMusicItem
      })
  }
  playNext(type="next"){
    let index = this.findMusicIndex(this.state.currentMusicItem);
      // 要播放音乐的索引
    let nextIndex = 0;
    const musicListLength = this.state.musicList.length;
    if (type === 'next') {
        nextIndex = (index + 1) % musicListLength;
    } else {
        nextIndex = (index - 1 + musicListLength) % musicListLength;
    }
    let musicItem = this.state.musicList[nextIndex];
      this.setState({
          currentMusitItem: musicItem
      });
      this.playMusic(musicItem);
  }

  findMusicIndex(item){
    return this.state.musicList.indexOf(item);
  }
  render() {
    return (
      <div className="App">
        <Player currentMusicItem={this.state.currentMusicItem} />
        <MusicList currentMusicItem={this.state.currentMusicItem}
                    musicList={this.state.musicList} />
      </div>
    );
  }
}

class Root extends Component{

  render(){
    return (
      <Router>
        <div className="index">
          <Header/>
          <Route exact path="/" component={App}/>
        </div>
      </Router>
    );
  }
}

export default Root;
