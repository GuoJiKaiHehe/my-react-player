import React ,{Component} from 'react'
import PubSub from 'pubsub-js'
import '../less/MusicListItem.less'
class MusicListItem extends Component{
  playerHandler(item,e){
    PubSub.publish('PLAY_MUSIC',item);;
    e.stopPropagation();
      e.preventDefault();
  }
  deleteHandler(item,e){
    e.stopPropagation();
    e.preventDefault();
    console.log(item);
    PubSub.publish('DELETE_MUSIC', item);


  }
  render(){
    const item=this.props.data;
    return (
        <li className={`row components-listitem ${this.props.focus? ' focus':'' }`}
            >
            <p  onClick={this.playerHandler.bind(this,item)}><span className="bold">{item.title}</span> - {item.artist}</p>
            <p className="-col-auto  delete"
               onClick={this.deleteHandler.bind(this,item)}></p>
        </li>
    );
  }
}

export default MusicListItem
