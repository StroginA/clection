import React from "react";
import axios from "axios";
import { Box, Heading, Level } from "react-bulma-components";
import { injectIntl } from "react-intl";
import CollectionBrief from "./elements/CollectionBrief";

class LargestCollections extends React.Component {
    state = {
        largest: [],
        error: false
    }

    componentDidMount = async () => {
        await axios.get('/api/v1/fetch-largest-collections')
        .then(res => {
            this.setState({largest: res.data.body});
        })
        .catch(() => this.setState({error: true}));
    }

    Collections = () => {
        const largest = this.state.largest;
        console.log(largest);
        if (!largest) {
            return (
                 <Level.Side aligns="left">
                    <Level.Item>
                        <CollectionBrief />
                    </Level.Item>
                    <Level.Item>
                        <CollectionBrief />
                    </Level.Item>
                    <Level.Item>
                        <CollectionBrief />
                    </Level.Item>
                </Level.Side>
            )
        } else {
            return (
                <Level.Side aligns="left">
                    {largest.map(this.wrapElement)}
                </Level.Side>
            )
        }
    }

    wrapElement = (props) => {
        return (
            <Level.Item key={props.id}>
                {CollectionBrief(props)}
            </Level.Item>
        )
    }
    
    render() {
        const intl = this.props.intl;
        return (
            <Box>
                <Heading>
                    {intl.formatMessage({id: "home.largest"})}
                </Heading>
                <Level>
                    <this.Collections />
                </Level>
            </Box>
        );
    }
}

export default injectIntl(LargestCollections);