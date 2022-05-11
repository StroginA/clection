import axios from "axios";
import React from "react";
import { Box, Heading } from "react-bulma-components";

class UserProfile extends React.Component {
    state = {
        name: this.props.user,
        errorMessage: ""
    }

    componentDidMount = () => {
        this.fetchProfile(this.state.user);
    }

    fetchProfile = async (user) => {
        await axios.get('/api/v1/fetch-user-profile', {params: {name: user}})
        .then(
            res => {
                this.setState({name: res.name})
            }
        )
        .catch(
            err => {
                this.setState({errorMessage: err.response.message})
            }
        )
    }

    render () {
        return (
            <Box>
                <Heading>
                    {
                        this.state.errorMessage ?
                        this.state.errorMessage :
                        this.state.name
                    }
                </Heading>
            </Box>
        )
    }
}

export default UserProfile;