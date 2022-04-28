import React from 'react';
import LocalePicker from '../localePicker/LocalePicker';
import {Heading, Navbar} from 'react-bulma-components';
import {injectIntl} from 'react-intl';

class Header extends React.Component {
    render(){
        const intl = this.props.intl;
        return (
            <Navbar fixed='top' alignItems='center'>
                <Navbar.Brand>
                    <Navbar.Item>
                        <Heading size='1'>Clection</Heading>
                    </Navbar.Item>
                </Navbar.Brand>
                <Navbar.Menu>
                <Navbar.Container>
                    <Navbar.Item>
                        <div>{intl.formatMessage({ id: 'nav.search' })}</div>
                    </Navbar.Item>
                    <Navbar.Item>
                        <div>{intl.formatMessage({ id: 'nav.signin' })}</div>
                    </Navbar.Item>
                </Navbar.Container>
                <Navbar.Container align='end'>
                    <LocalePicker currentLocale={this.props.currentLocale} onLocaleChanged={this.props.setCurrentLocale} />
                </Navbar.Container>
                </Navbar.Menu>
            </Navbar>
        );
    }
}

export default injectIntl(Header);
