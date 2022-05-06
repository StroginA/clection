import React, {Component} from 'react';

import axios from 'axios';
import {FormattedMessage, IntlProvider} from 'react-intl';
import locales from './shared/constants/locales';
import localStorageKeys from './shared/constants/localStorageKeys';
import enMessages from './shared/locale/en.json';
import ruMessages from './shared/locale/ru.json';
import './App.scss';

import Header from './common/header/Header';
import { Box, Section } from 'react-bulma-components';
import ThemeContextWrapper from './shared/constants/ThemeContextWrapper';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/pages/Home';
import Layout from './app/pages/Layout';
import SigninPage from './app/pages/SigninPage';
import SearchPage from './app/pages/SearchPage';

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
		console.log(res.data.body);
		const q = await axios.get('/api/v1/db-connection-check');
		console.log(q.data.body);
	}
	
	render() {
		return (
			<div className="App">
				<IntlProvider locale={this.state.currentLocale} messages={messages[this.state.currentLocale]}>
					<ThemeContextWrapper>
						<BrowserRouter>
						<Routes>
								<Route
									path="/"
									element={
										<Layout
											currentLocale={this.state.currentLocale}
											setCurrentLocale={
												(x) => { this.setState({ currentLocale: x }) }
											} />
									}
								>
									<Route index element={<Home />} />
									<Route path='signin' element={<SigninPage />} />
									<Route path='search' element={<SearchPage />} />
								</Route>
						</Routes>
						</BrowserRouter>
					</ThemeContextWrapper>
				</IntlProvider>
			</div>
		);
	}
}

export default App;
