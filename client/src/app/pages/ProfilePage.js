import React from "react";
import { Box } from "react-bulma-components";
import { AuthContext } from "../../shared/constants/AuthContext";
import UserProfile from "../UserProfile";

class ProfilePage extends React.Component {
    render() {
        return (
            <Box>
                <UserProfile user={this.props.user} />
            </Box>
        );
    }
}

export default ProfilePage;