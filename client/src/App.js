import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
	state = {
		response: {},
		query: 'test'
	}
	
	componentDidMount = async () => {
		const res = await axios.get('/api/v1/connection-check');
		this.setState({response: res.data});
		console.log('test');
		const q = await axios.get('/api/v1/db-connection-check');
		console.log(q.data);
		this.setState({query: q.data.body.name});
	}
	
	render(){
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						{this.state.response.body}
					</p>
					<p>
						DB response: {this.state.query}
					</p>
				</header>
			</div>
		);
	}
}

export default App;
