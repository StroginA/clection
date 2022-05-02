import React, {Component} from 'react';

import axios from 'axios';
import {FormattedMessage, IntlProvider} from 'react-intl';
import locales from './shared/constants/locales';
import localStorageKeys from './shared/constants/localStorageKeys';
import enMessages from './shared/locale/en.json';
import ruMessages from './shared/locale/ru.json';
import './App.scss';

import Header from './common/header/Header';
import { Section } from 'react-bulma-components';
import ThemeContextWrapper from './shared/constants/ThemeContextWrapper';

const messages = {
	[locales.EN]: enMessages,
	[locales.RU]: ruMessages
  };

class App extends Component {
	state = {
		currentLocale: localStorage.getItem(localStorageKeys.LOCALE) || locales.EN
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
				<IntlProvider locale={this.state.currentLocale} messages={messages[this.state.currentLocale]}>
					<Section>
					<Header 
						currentLocale={this.state.currentLocale}
						setCurrentLocale={
							(x) => {this.setState({currentLocale: x})}
						}
					/>
					</Section>
					<Section>
						<FormattedMessage id='test.content' />
					</Section>
				</IntlProvider>
			</div>
		);
	}
}

export default App;
