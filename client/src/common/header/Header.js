import React from 'react';
import LocalePicker from '../localePicker/LocalePicker';
import {Heading, Navbar} from 'react-bulma-components';
import {injectIntl} from 'react-intl';
import ThemeSwitch from '../themeSwitch/ThemeSwitch';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render(){
        const intl = this.props.intl;
        return (
            <Navbar fixed='top' alignItems='center'>
                <Navbar.Brand>
                    <Navbar.Item>
                        <Link to={"/"}>
                            <Heading size='1'>Clection</Heading>
                        </Link>
                    </Navbar.Item>
                </Navbar.Brand>
                <Navbar.Menu>
                <Navbar.Container>
                    <Navbar.Item>
                        <Link to={'search'}>
                            {intl.formatMessage({ id: 'nav.search' })}
                        </Link>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Link to={'signin'}>
                            {intl.formatMessage({ id: 'nav.signin' })}
                        </Link>
                    </Navbar.Item>
                </Navbar.Container>
                <Navbar.Container align='end'>
                    <ThemeSwitch />
                    <LocalePicker currentLocale={this.props.currentLocale} onLocaleChanged={this.props.setCurrentLocale} />
                </Navbar.Container>
                </Navbar.Menu>
            </Navbar>
        );
    }
}

export default injectIntl(Header);
