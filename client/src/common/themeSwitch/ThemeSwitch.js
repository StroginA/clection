import React, { useContext } from 'react';
import { ThemeContext } from '../../shared/constants/ThemeContext';
import { Button } from 'react-bulma-components';
import { injectIntl } from 'react-intl';

function ThemeSwitch (props) {
    const { darkTheme, toggleTheme } = useContext(ThemeContext);
    const intl = props.intl;
    return (
        <Button 
        onClick={() => toggleTheme()}>
            {intl.formatMessage({id: 'nav.theme'})}
        </Button>
    );
}

export default injectIntl(ThemeSwitch);