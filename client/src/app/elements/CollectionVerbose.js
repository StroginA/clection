import axios from "axios";
import React from "react";
import { Box, Button, Heading, Columns, Block, Icon, Form, Level, Section, Image, Table } from "react-bulma-components";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
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
        imageSource: "/logo192.png",
        items: []
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
                    itemCount: res.data.Items.length || 0,
                    imageSource: res.data.imageSource || "/logo192.png",
                    items: res.data.Items || []
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

    ItemsTable = (props) => {
        const heading = [
            props.name,
            props.createdAt
        ]
        const body = this.state.items.map(
            item => {
            return (
            <tr key={item.id}>
                <td>
                    <Link to={`/item/${item.id}`}>{item.name}</Link>
                </td>
                <td>{item.createdAt}</td>
            </tr>
            )
            }
        )
        return (
            <Table>
                <thead>
                    <tr>
                        {heading.map(head => <th key={head}>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </Table>
        )
    }

    render() {
        const intl = this.props.intl;
        return (
            <Box>
                {this.state.errorStatus ?
                <Heading>
                    {
                        this.state.errorStatus === 404 ?
                            intl.formatMessage({ id: 'collection.not-found' }) :
                            intl.formatMessage({ id: 'general.error-message' })
                    }
                </Heading> :
                <>
                    <Heading>
                        {this.state.name}
                    </Heading>
                    <Section>
                        <Columns>
                            <Columns.Column size={3}>
                                <Image
                                size={128}
                                src={this.state.imageSource}
                                fallback="no_img"
                                />
                            </Columns.Column>
                            <Columns.Column size='auto'>
                                <p>
                                    <strong>{intl.formatMessage({ id: "collection.user" })}: </strong>
                                    <Link to={`/profile/${this.state.user}`}>
                                        {this.state.user}
                                    </Link>
                                </p>
                                <p>
                                    <strong>{intl.formatMessage({ id: "collection.category" })}: </strong>
                                    {this.state.category}
                                </p>
                                <p>
                                    <strong>{intl.formatMessage({ id: "collection.item-count" })}: </strong>
                                    {this.state.itemCount}
                                </p>
                            </Columns.Column>
                        </Columns>
                    </Section>
                    <Section>
                        <Heading>
                            {intl.formatMessage({ id: "collection.items" })}
                        </Heading>
                        <this.ItemsTable 
                        name={intl.formatMessage({ id: 'collection.item.name' })}
                        createdAt={intl.formatMessage({ id: 'collection.item.createdAt' })}
                        />
                    </Section>
                </>}
            </Box>
        )
    }
}

export default injectRouter(injectIntl(CollectionVerbose));