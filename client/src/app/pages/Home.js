import React from 'react';
import {injectIntl} from 'react-intl';
import { Box } from 'react-bulma-components';
import LatestItems from '../LatestItems';
import LargestCollections from '../LargestCollections';
import { AuthContext } from '../../shared/constants/AuthContext';

class Home extends React.Component {
    static contextType = AuthContext;

    render() {
        this.context.verifySession();
        const intl = this.props.intl;
        return (
            <Box>
                <LatestItems />
                <LargestCollections />
            </Box>
        );
    }
}

export default injectIntl(Home);