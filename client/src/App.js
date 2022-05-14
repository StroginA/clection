import React, {Component} from 'react';

import axios from 'axios';
import {FormattedMessage, IntlProvider} from 'react-intl';
import locales from './shared/constants/locales';
import localStorageKeys from './shared/constants/localStorageKeys';
import enMessages from './shared/locale/en.json';
import ruMessages from './shared/locale/ru.json';
import './App.scss';

import ThemeContextWrapper from './shared/constants/ThemeContextWrapper';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/pages/Home';
import Layout from './app/pages/Layout';
import SigninPage from './app/pages/SigninPage';
import SearchPage from './app/pages/SearchPage';
import ProfilePage from './app/pages/ProfilePage';
import AuthProvider from './shared/constants/AuthProvider';
import { AuthContext } from './shared/constants/AuthContext';
import CollectionPage from './app/pages/CollectionPage';

const messages = {
	[locales.EN]: enMessages,
	[locales.RU]: ruMessages
  };

class App extends Component {
	static ContextType = AuthContext;
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
						<AuthProvider>
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
									<Route path='profile'>
										<Route path=':username' element={<ProfilePage />} />
									</Route>
									<Route path='collection'>
										<Route path=':collectionId' element={<CollectionPage />} />
									</Route>
								</Route>
						</Routes>
						</AuthProvider>
						</BrowserRouter>
					</ThemeContextWrapper>
				</IntlProvider>
			</div>
		);
	}
}

export default App;
