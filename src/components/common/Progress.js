import React, {Component} from 'react';
import "../../less/Progress.less"

class Loading extends Component{
	static defaultProps={
		barColor: 'rgb(47,152,66)',
		width:'0%'
	}

	constructor(props) {
		super(props);
	}
	changePropress(e){
		let {progressBar} = this.refs;
		let progress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
		// progress   小数；
		this.props.progressChangeHanlder && this.props.progressChangeHanlder(progress);
		e.stopPropagation();
		e.preventDefault();
	}

	render(){
		return  (
				<div className="component-propress"
					 ref="progressBar"
					 onClick={this.changePropress.bind(this)}>
					 <div className="progress"
					 	  style={{
					 	  		width:this.props.width,
					 	  		backgrounddColor:this.props.bgColor
					 	  		}}>

					 </div>
				</div>
			);
	}
}



export default Loading;
