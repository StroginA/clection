import React from 'react';
import {injectIntl} from 'react-intl';
import { Box } from 'react-bulma-components';
import LatestItems from '../LatestItems';
import LargestCollections from '../LargestCollections';

class Home extends React.Component {
    render() {
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