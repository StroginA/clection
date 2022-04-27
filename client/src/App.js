import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {IntlProvider} from 'react-intl';
import locales from "./shared/constants/locales";
import themes from "./shared/constants/themes";
import localStorageKeys from "./shared/constants/localStorageKeys";
import enMessages from './shared/locale/en.json';
import ruMessages from './shared/locale/ru.json';

import Header from './common/header/Header.jsx';

const messages = {
	[locales.EN]: enMessages,
	[locales.RU]: ruMessages
  };

class App extends Component {
	state = {
		currentLocale: localStorage.getItem(localStorageKeys.LOCALE) || locales.EN,
		currentTheme: localStorage.getItem(localStorageKeys.THEME) || themes.LIGHT
	}
	
	componentDidMount = async () => {
		const res = await axios.get('/api/v1/connection-check');
		console.log(res.data);
		const q = await axios.get('/api/v1/db-connection-check');
		console.log(q.data);
	}
	
	render(){
		return (
			<div className="App">
				<IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
					<Header 
						currentLocale={this.state.currentLocale}
						setCurrentLocale={
							(x) => {this.setState({currentLocale: x})}
						}
					/>
				</IntlProvider>
			</div>
		);
	}
}

export default App;
