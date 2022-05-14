import axios from "axios";
import React from "react";
import { Box, Button, Heading, Columns, Block, Icon, Form, Level } from "react-bulma-components";
import { injectIntl } from "react-intl";
import { AuthContext } from "../../shared/constants/AuthContext";
import { injectRouter } from "../../shared/constants/injectRouter";

class CollectionVerbose extends React.Component {
    static contextType = AuthContext;
    state = {
        id: this.props.id,
        name: "",
        category: "",
        user: "",
        itemCount: 0,
        imageSource: "/logo192.png"
    }
    componentDidMount = async () => {
        this.fetchCollection();
    }

    fetchCollection = () => {
        axios.get(
            '/api/v1/fetch-collection',
            {
                params: {
                    id: this.props.id
                }
            }
        )
        .then(
            res => {
                this.setState({
                    name: res.data.name,
                    category: res.data.category,
                    user: res.data.user,
                    itemCount: res.data.itemCount
                })
            }
        )
        .catch(
            err => {
                err.response.status === 404 ?
                this.setState({errorStatus: 404}) :
                this.setState({errorStatus: "UNKNOWN_ERROR"})
            }
        )
    }

    render() {
        return (
            <Box>

            </Box>
        )
    }
}

export default injectRouter(injectIntl(CollectionVerbose));