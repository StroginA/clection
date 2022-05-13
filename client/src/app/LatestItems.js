import React from "react";
import { Box, Heading, Level } from "react-bulma-components";
import { injectIntl } from "react-intl";
import ItemBrief from "./elements/ItemBrief";
import axios from "axios";

class LatestItems extends React.Component {
    state = {
        latest: [],
        error: false
    }

    componentDidMount = () => {
        this.fetchItems();
    }

    fetchItems = async () => {
        await axios.get('/api/v1/fetch-latest-items')
        .then(res => {
            this.setState({latest: res.data.body});
        })
        .catch(() => this.setState({error: true}));
    }

    Items = () => {
        return (
            <Level.Side aligns="left">
                {this.state.latest.map(this.wrapElement)}
            </Level.Side>
        )
    }

    wrapElement = (props) => {
        return (
            <Level.Item key={props.id}>
                {ItemBrief(props)}
            </Level.Item>
        )
    }

    render() {
        const intl = this.props.intl;
        return (
            <Box>
                <Heading>
                    {intl.formatMessage({id: "home.latest"})}
                </Heading>
                <Level>
                    <this.Items />
                </Level>
            </Box>
        );
    }
}

export default injectIntl(LatestItems);