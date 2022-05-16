import React from "react";
import { Box } from "react-bulma-components";
import { AuthContext } from "../../shared/constants/AuthContext";
import { injectRouter } from "../../shared/constants/injectRouter";
import ItemVerbose from "../elements/ItemVerbose";

class ItemPage extends React.Component {
    static contextType = AuthContext;
    render() {
        this.context.verifySession();
        return (
            <Box>
                <ItemVerbose id={this.props.urlParams.itemId} />
            </Box>
        );
    }
}

export default injectRouter(ItemPage);