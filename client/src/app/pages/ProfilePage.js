import React from "react";
import { Box } from "react-bulma-components";
import { AuthContext } from "../../shared/constants/AuthContext";
import { injectRouter } from "../../shared/constants/injectRouter";
import UserProfile from "../UserProfile";

class ProfilePage extends React.Component {
    static contextType = AuthContext;
    render() {
        this.context.verifySession();
        return (
            <Box>
                <UserProfile user={this.props.urlParams.username} />
            </Box>
        );
    }
}

export default injectRouter(ProfilePage);