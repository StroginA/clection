import axios from "axios";
import React from "react";
import { Box, Button, Heading, Columns, Block, Icon, Form, Level, Section, Image, Table } from "react-bulma-components";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/constants/AuthContext";
import { injectRouter } from "../../shared/constants/injectRouter";
import ReactMarkdown from "react-markdown";
import CreateItemForm from "./CreateItemForm";

class CollectionVerbose extends React.Component {
    static contextType = AuthContext;
    state = {
        id: this.props.id,
        name: "",
        category: "",
        user: "",
        itemCount: 0,
        imageSource: "/logo192.png",
        items: [],
        creatingItem: false
    }

    navigate = this.props.navigate;
    
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
                    description: res.data.description || "",
                    imageSource: res.data.imageSource || "/logo192.png",
                    items: res.data.Items || [],
                    customFields: res.data.customFields || []
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

    handleDeleteCollection = async () => {
        await this.context.verifySession();
        if (this.context.isAdmin || this.context.user === this.state.user) {
            axios.delete(
                '/api/v1/delete-collection',
                {
                    data: {
                        id: this.props.id
                    }
                }
            )
            .then(
                res => {this.navigate(`/profile/${this.state.user}`)}
            )
        }
    }

    openItemForm = () => {
        this.setState({creatingItem: true});
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
                                    {intl.formatMessage({id: `category.${this.state.category}`})}
                                </p>
                                <p>
                                    <strong>{intl.formatMessage({ id: "collection.item-count" })}: </strong>
                                    {this.state.itemCount}
                                </p>
                                <p>
                                    <strong>{intl.formatMessage({ id: "collection.description" })}: </strong>
                                    <ReactMarkdown>{this.state.description}</ReactMarkdown>
                                </p>
                                
                                {
                                        !this.state.creatingItem ?
                                        <Button
                                        color='info'
                                        invisible={!((this.context.user === this.state.name) || this.context.isAdmin)}
                                        onClick={this.openItemForm}
                                        >
                                            {intl.formatMessage({ id: "user.items.create-item" })}
                                        </Button> :
                                        <Box>
                                            <CreateItemForm 
                                            userName={this.state.user}
                                            collectionId={this.state.id}/>
                                        </Box>
                                    }
                            </Columns.Column>
                            <Columns.Column size={2}>
                            {((this.context.user === this.state.user) || this.context.isAdmin) &&
                                <Button
                                color='danger'
                                onClick={this.handleDeleteCollection}
                                >
                                {intl.formatMessage({ id: "collection.delete" })}
                                </Button>}
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
                        customFields={this.state.customFields}
                        />
                    </Section>
                </>}
            </Box>
        )
    }
}

export default injectRouter(injectIntl(CollectionVerbose));