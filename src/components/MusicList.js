import React,{Component} from 'react'
import '../less/MusicList.less'

import MusicListItem from './MusicListItem'

class MusicList extends Component{
  render(){
    let items=this.props.musicList.map((item)=>{
      return (
        <MusicListItem  key={item.id}
                        data={item}
                        focus={this.props.currentMusicItem === item} />
      );
    })
    return (
      <ul>
        {items}
      </ul>
    );
  }
}

export default MusicList;
