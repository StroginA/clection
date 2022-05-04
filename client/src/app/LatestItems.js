import React from "react";
import { Box, Heading, Level } from "react-bulma-components";
import { injectIntl } from "react-intl";
import ItemBrief from "./elements/ItemBrief";

class LatestItems extends React.Component {
    render() {
        const intl = this.props.intl;
        return (
            <Box>
                <Heading>
                    {intl.formatMessage({id: "home.latest"})}
                </Heading>
                <Level>
                    <Level.Side align="left">
                        <Level.Item>
                            <ItemBrief />
                        </Level.Item>
                        <Level.Item>
                            <ItemBrief />
                        </Level.Item>
                        <Level.Item>
                            <ItemBrief />
                        </Level.Item>
                    </Level.Side>
                </Level>
            </Box>
        );
    }
}

export default injectIntl(LatestItems);