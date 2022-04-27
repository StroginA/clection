import React from "react";
import {FormattedMessage} from "react-intl";
import locales from "../../shared/constants/locales";
import localStorageKeys from "../../shared/constants/localStorageKeys";
import enMessages from './shared/locale/en.json';
import ruMessages from './shared/locale/ru.json';

class LocalePicker extends React.Component ({ currentLocale, onLocaleChanged }) {
    state = {
        locale: {currentLocale}
    }

    onChanged = (e) => {
        const { value } = e.target;
        this.setState({locale: value});
        localStorage.setItem(localStorageKeys.LOCALE, value);
        onLocaleChanged(value);
        console.log('Language switched')
    }

    render(){
        return (
            <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>
                            <FormattedMessage id="nav.language" />
                        </span>
                        <span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <a
                            class="dropdown-item"
                            value={locales.EN}
                        >
                            {enMessages.locale.languagename}
                        </a>
                        <a
                            class="dropdown-item"
                            value={locales.RU}
                        >
                            {ruMessages.locale.languagename}
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default LocalePicker;