import React from 'react';
import {FormattedMessage} from 'react-intl';
import locales from '../../shared/constants/locales';
import localStorageKeys from '../../shared/constants/localStorageKeys';
import {Dropdown, Icon} from 'react-bulma-components';

class LocalePicker extends React.Component {
    state = {
        locale: this.props.currentLocale
    }

    handleChange = (value) => {
        this.setState({locale: value});
        localStorage.setItem(localStorageKeys.LOCALE, value);
        this.props.onLocaleChanged(value);
        console.log('Language switched')
    }

    render(){
        return (
            <Dropdown
                icon={<Icon><i aria-hidden="true" className="fas fa-angle-down"/></Icon>}
                label={<FormattedMessage id="nav.language" />}
                onChange={this.handleChange}
            >
                <Dropdown.Item
                    renderAs="a"
                    value={locales.EN}
                >
                    <FormattedMessage id="locale.en" />
                </Dropdown.Item>
                <Dropdown.Item
                    renderAs="a"
                    value={locales.RU}
                >
                    <FormattedMessage id="locale.ru" />
                </Dropdown.Item>
            </Dropdown>
        )
    }
}

export default LocalePicker;