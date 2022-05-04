import React from "react";
import { Box, Heading, Level } from "react-bulma-components";
import { injectIntl } from "react-intl";
import CollectionBrief from "./elements/CollectionBrief";

class LargestCollections extends React.Component {
    render() {
        const intl = this.props.intl;
        return (
            <Box>
                <Heading>
                    {intl.formatMessage({id: "home.largest"})}
                </Heading>
                <Level>
                    <Level.Side align="left">
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
                </Level>
            </Box>
        );
    }
}

export default injectIntl(LargestCollections);