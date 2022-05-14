import React from "react";
import { Box } from "react-bulma-components";
import { AuthContext } from "../../shared/constants/AuthContext";
import { injectRouter } from "../../shared/constants/injectRouter";
import CollectionVerbose from "../elements/CollectionVerbose";

class CollectionPage extends React.Component {
    static contextType = AuthContext;
    render() {
        this.context.verifySession();
        return (
            <Box>
                <CollectionVerbose id={this.props.urlParams.collectionId} />
            </Box>
        );
    }
}

export default injectRouter(CollectionPage);