import React from 'react';
import {injectIntl} from 'react-intl';
import { Box } from 'react-bulma-components';

class Home extends React.Component {
    render() {
        const intl = this.props.intl;
        return (
            <Box>
                {intl.formatMessage({id: 'test.content'})}
            </Box>
        );
    }
}

export default injectIntl(Home);