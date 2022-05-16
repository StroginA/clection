import axios from "axios";
import React from "react";
import { Box, Button, Heading, Columns, Block, Icon, Form, Level } from "react-bulma-components";
import { injectIntl } from "react-intl";
import { AuthContext } from "../shared/constants/AuthContext";
import { injectRouter } from "../shared/constants/injectRouter";
import CollectionBrief from "./elements/CollectionBrief";
import CreateCollectionForm from "./elements/CreateCollectionForm";

class UserProfile extends React.Component {
    static contextType = AuthContext;
    state = {
        name: "",
        errorStatus: "",
        isBlocked: false,
        isAdmin: false,
        collections: [],
        id: 0,
        creatingCollection: false
    }

    navigate = this.props.navigate;

    componentDidMount = async () => {
        await this.fetchProfile();
        this.fetchCollections();
    }

    fetchProfile = () => {
        axios.get('/api/v1/fetch-user-profile', {params: {name: this.props.user}})
        .then(
            res => {
                this.setState({
                    name: res.data.name,
                    isBlocked: res.data.isBlocked,
                    isAdmin: res.data.isAdmin,
                    id: res.data.id
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

    fetchCollections = async () => {
        await axios.get(
            '/api/v1/fetch-user-collections',
            {
                params: {
                    UserName: this.props.user
                }
            }
        )
            .then(res => {
                this.setState({ collections: res.data.body });
            })
            .catch(() => this.setState({ error: true }));
    }

    handleDeleteUser = async () => {
        await this.context.verifySession();
        if (this.context.isAdmin || this.context.user === this.state.name) {
            axios.delete(
                '/api/v1/delete-user',
                {
                    data: {
                        name: this.state.name
                    }
                }
            )
            .then(
                res => {this.navigate(`/profile/${this.state.user}`)}
            )
        }
    }

    handleBlockUser = async () => {
        await this.context.verifySession();
        if (this.context.isAdmin) {
            axios.put(
                '/api/v1/block-user',
                {
                    name: this.state.name
                }
            )
            .then(
                res => this.setState({isBlocked: true})
            )
        }
    }

    handleUnblockUser = async () => {
        await this.context.verifySession();
        if (this.context.isAdmin) {
            axios.put(
                '/api/v1/unblock-user',
                {
                    name: this.state.name
                }
            )
            .then(
                res => this.setState({isBlocked: false})
            )
        }
    }

    handleMakeAdmin = async () => {
        await this.context.verifySession();
        if (this.context.isAdmin) {
            axios.put(
                '/api/v1/make-admin',
                {
                    name: this.state.name
                }
            )
            .then(
                res => this.setState({isAdmin: true})
            )
        }
    }

    handleStripAdmin = async () => {
        await this.context.verifySession();
        if (this.context.isAdmin) {
            axios.put(
                '/api/v1/strip-admin',
                {
                    name: this.state.name
                }
            )
            .then(
                res => this.setState({isAdmin: false})
            )
        }
    }

    Collections = () => {
        return (
            <Level.Side aligns="left">
                {this.state.collections.map(this.wrapElement)}
            </Level.Side>
        )
    }

    wrapElement = (props) => {
        return (
            <Level.Item key={props.id}>
                {CollectionBrief(props)}
            </Level.Item>
        )
    }

    openCollectionForm = () => {
        this.setState({creatingCollection: true});
    }

    render () {
        const intl = this.props.intl;
        return (
            <Box>
                {
                    this.state.errorStatus ?
                    <Heading>
                    {
                        this.state.errorStatus === 404 ?
                        intl.formatMessage({ id: 'user.not-found' }) :
                        intl.formatMessage({ id: 'general.error-message' }) 
                    }
                    </Heading> :
                        <>
                            <Heading>
                                {
                                    `${intl.formatMessage({ id: 'user.profile' })}: ${this.state.name}`
                                }
                            </Heading>
                            <Columns>
                                <Columns.Column size={3}>
                                    <Box>
                                    {((this.context.user === this.state.name) || this.context.isAdmin) &&
                                    <Form.Field>
                                        <Form.Control>
                                            <Button
                                                color='danger'
                                                fullwidth='true'
                                                onClick={this.handleDeleteUser}
                                            >
                                                {intl.formatMessage({ id: 'user.delete-user' })} {this.state.name}
                                            </Button>
                                            <Icon align="right" size="small">
                                                <i className="fas fa-triangle-exclamation" />
                                            </Icon>
                                        </Form.Control>
                                    </Form.Field>
                                    }
                                    {(!this.state.isBlocked && this.context.isAdmin) &&
                                    <Form.Field>
                                        <Form.Control>
                                            <Button
                                                color='normal'
                                                fullwidth='true'
                                                onClick={this.handleBlockUser}
                                            >
                                                {intl.formatMessage({ id: 'user.block-user' })} {this.state.name}
                                            </Button>
                                            <Icon align="right" size="small" color='info'>
                                                <i className="fas fa-lock" />
                                            </Icon>
                                        </Form.Control>
                                    </Form.Field>}
                                    {(this.state.isBlocked && this.context.isAdmin) &&
                                    <Form.Field>
                                        <Form.Control>
                                            <Button
                                                color='normal'
                                                fullwidth='true'
                                                onClick={this.handleUnblockUser}
                                            >
                                                {intl.formatMessage({ id: 'user.unblock-user' })} {this.state.name}
                                            </Button>
                                            <Icon align="right" size="small" color='info'>
                                                <i className="fas fa-lock-open" />
                                            </Icon>
                                        </Form.Control>
                                    </Form.Field>}
                                    {(!this.state.isAdmin && this.context.isAdmin) &&
                                    <Form.Field>
                                        <Form.Control>
                                            <Button
                                                color='info'
                                                fullwidth='true'
                                                onClick={this.handleMakeAdmin}
                                            >
                                                {intl.formatMessage({ id: 'user.make-admin' })} {this.state.name}
                                            </Button>
                                            <Icon align="right" size="small">
                                                <i className="fas fa-id-badge" />
                                            </Icon>
                                        </Form.Control>
                                    </Form.Field>}
                                    {(this.state.isAdmin && 
                                    (this.context.isAdmin || this.context.user === this.state.name)) &&
                                    <Form.Field>
                                        <Form.Control>
                                            <Button
                                                color='danger'
                                                fullwidth='true'
                                                onClick={this.handleStripAdmin}
                                            >
                                                {intl.formatMessage({ id: 'user.strip-admin' })} {this.state.name}
                                            </Button>
                                            <Icon align="right" size="small">
                                                <i className="fas fa-ban" />
                                            </Icon>
                                        </Form.Control>
                                    </Form.Field>}
                                    </Box>
                                </Columns.Column>
                                <Columns.Column size='auto'>
                                    <Box>
                                        <Heading>
                                            {intl.formatMessage({ id: "user.collections" })}
                                        </Heading>
                                        <Level>
                                            <this.Collections />
                                        </Level>
                                    </Box>
                                    {
                                        !this.state.creatingCollection ?
                                        <Button
                                        color='info'
                                        invisible={!((this.context.user === this.state.name) || this.context.isAdmin)}
                                        onClick={this.openCollectionForm}
                                        >
                                            {intl.formatMessage({ id: "user.collections.create-collection" })}
                                        </Button> :
                                        <Box>
                                            <CreateCollectionForm userName={this.state.name} userId={this.state.id}/>
                                        </Box>
                                    }
                                </Columns.Column>
                            </Columns>
                        </>
                }
            </Box>
        )
    }
}

export default injectRouter(injectIntl(UserProfile));