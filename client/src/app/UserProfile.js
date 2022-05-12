import axios from "axios";
import React from "react";
import { Box, Button, Heading, Columns, Block, Icon, Form } from "react-bulma-components";
import { injectIntl } from "react-intl";
import { AuthContext } from "../shared/constants/AuthContext";

class UserProfile extends React.Component {
    static contextType = AuthContext;
    state = {
        name: "",
        errorStatus: "",
        isBlocked: false,
        isAdmin: false
    }

    componentDidMount = () => {
        this.fetchProfile(this.props.user);
    }

    fetchProfile = async (user) => {
        await axios.get('/api/v1/fetch-user-profile', {params: {name: user}})
        .then(
            res => {
                this.setState({
                    name: res.data.name,
                    isBlocked: res.data.isBlocked,
                    isAdmin: res.data.isAdmin
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
                                    {((this.context.user === this.state.name) || this.context.isAdmin) &&
                                    <Form.Field>
                                        <Form.Control>
                                            <Button
                                                color='danger'
                                                fullwidth='true'
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
                                            >
                                                {intl.formatMessage({ id: 'user.strip-admin' })} {this.state.name}
                                            </Button>
                                            <Icon align="right" size="small">
                                                <i className="fas fa-ban" />
                                            </Icon>
                                        </Form.Control>
                                    </Form.Field>}
                                </Columns.Column>
                                <Columns.Column size='auto'>

                                </Columns.Column>
                            </Columns>
                        </>
                }
            </Box>
        )
    }
}

export default injectIntl(UserProfile);