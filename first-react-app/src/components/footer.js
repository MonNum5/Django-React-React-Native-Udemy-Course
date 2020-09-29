import React, { Component } from 'react';
import { CtxConsumer } from '../index'

class Footer extends Component {

	state = {
		name: '',
		age: 36
	}
	changeText= (evt) => {
		this.setState({name : evt.target.value})
	}

	componentDidMount(){
		this.setState({name:'MyNAme'})
	}
	render () {

		const animals =['cat', 'dog', 'dolphin']
		return (
			<React.Fragment>
			<h2 onClick={this.props.myAlert}> {this.props.trademark} </h2>
			<input value ={this.state.name} type="text" onChange={this.changeText}/>
			<p>{this.state.name}</p>

			{ this.state.age >= 45 ? (
				 <React.Fragment>
					<p>age is higher than 35</p>
				</React.Fragment>
				) : (
				<React.Fragment>
					<p>age is lower than 35</p>
				</React.Fragment>
				)


			}
			<div>
				{ animals.map( animal => {
					return (<p key ={animal} >{ animal }</p>)
				})}
			</div>

	
			<CtxConsumer>
				{(context) => (
					<div>
					{ context.animals.map( animal => {
						return(
							<p key={animal}>{ animal }</p>
							);
					})}
					</div>
				)}
	
			</CtxConsumer>
	

			</React.Fragment>
			)
			

	}

}

export default Footer;