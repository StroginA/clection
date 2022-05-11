import React from 'react';
import LocalePicker from '../localePicker/LocalePicker';
import {Heading, Navbar} from 'react-bulma-components';
import {injectIntl} from 'react-intl';
import ThemeSwitch from '../themeSwitch/ThemeSwitch';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/constants/AuthContext';

class Header extends React.Component {
    static contextType = AuthContext;

    handleSignout = () => {
        this.context.signout();
    }

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
                    {
                    !this.context.user 
                    &&
                    <Navbar.Item>
                        <Link to={'signin'}>
                            {intl.formatMessage({ id: 'nav.signin' })}
                        </Link>
                    </Navbar.Item>
                    }
                    {
                    this.context.user 
                    &&
                    <Navbar.Item>
                        <Link to={'profile'}>
                            {intl.formatMessage({ id: 'nav.profile' })}: {this.context.user}
                        </Link>
                    </Navbar.Item>
                    }
                    {
                    this.context.user 
                    &&
                    <Navbar.Item
                    onClick={this.handleSignout}
                    >
                        <Link to={'signin'}>
                            {intl.formatMessage({ id: 'nav.signout' })}
                        </Link>
                    </Navbar.Item>
                    }
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
