import React from "react";
import axios from "axios";
import { injectIntl } from "react-intl";
import { Box, Form, Icon, Heading, Button } from "react-bulma-components";
import debounce from "lodash.debounce";

class SignupForm extends React.Component {
    state = {
        username: "",
        password: "",
        confirmPassword: "",
        userExists: false,
        userAvailable: false,
        passwordsMatch: false,
        error: false
    }

    handleUsernameChange = (e) => {
        this.setState({ userExists: false });
        this.setState({ userAvailable: false });
        this.setState({ error: false });
        this.setUsername(e.target.value);
        this.checkUsername(e.target.value);
    }

    handlePasswordChange = (e) => {
        this.setState({error: false});
        this.setPassword(e.target.value);
        this.setState({passwordsMatch: e.target.value === this.state.confirmPassword});
    }

    handleConfirmPasswordChange = (e) => {
        this.setState({error: false});
        this.setConfirmPassword(e.target.value);
        this.setState({passwordsMatch: this.state.password === e.target.value});
    }

    checkUsername = debounce((x) => {
        if (x) axios.put(
            '/api/v1/is-username-available',
            {
                username: x
            })
            .then(res => {
                this.setState({userAvailable: true});
            })
            .catch(
                err => {
                    if (err.response.status === 409) {
                        this.setState({ userExists: true })
                    } else {
                        this.setState({ error: true })
                    }
                }
            );
    }, 500);

    setUsername = (x) => this.setState({username: x});
    setPassword = (x) => this.setState({password: x});
    setConfirmPassword = (x) => this.setState({confirmPassword: x});
    onSubmitEvent = (e) => {
        //stub
        e.preventDefault();
    }

    render() {
        const intl = this.props.intl;
        return (
            <Box>
                <form onSubmit={this.onSubmitEvent}>
                    <Heading>{intl.formatMessage({ id: 'signin.signup' })}</Heading>
                    <Form.Field>
                        <Form.Label>{intl.formatMessage({ id: 'signin.username' })}</Form.Label>
                        <Form.Control>
                            <Form.Input
                                color={
                                    this.state.userExists ? 
                                    "danger" : 
                                    this.state.userAvailable ?
                                    "success" :
                                    ""
                                }
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                            />
                            <Icon align="left" size="small">
                                <i className="fas fa-user" />
                            </Icon>
                            <Icon align="right" size="small" invisible={!this.state.userExists}>
                                <i className="fas fa-circle-exclamation" />
                            </Icon>
                            <Icon align="right" size="small" invisible={!this.state.userAvailable}>
                                <i className="fas fa-check" />
                            </Icon>
                        </Form.Control>
                        <Form.Help color={
                            this.state.userAvailable ?
                            "success" :
                            "danger"
                            }>
                            {
                            this.state.userExists ? 
                            intl.formatMessage({ id: 'signin.user-exists' }) : 
                            this.state.userAvailable ?
                            intl.formatMessage({ id: 'signin.username-available' }) :
                            ''
                            }
                        </Form.Help>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>{intl.formatMessage({ id: 'signin.password' })}</Form.Label>
                        <Form.Control>
                            <Form.Input
                                color={
                                    this.state.confirmPassword && !this.state.passwordsMatch ?
                                    "danger" :
                                    this.state.confirmPassword && this.state.passwordsMatch ?
                                    "success" :
                                    ""
                                }
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                type="password"
                            />
                            <Icon align="left" size="small">
                                <i className="fas fa-key" />
                            </Icon>
                            <Icon align="right" size="small" 
                            invisible={
                                this.state.confirmPassword && !this.state.passwordsMatch ?
                                false :
                                true
                            }>
                                <i className="fas fa-circle-exclamation" />
                            </Icon>
                            <Icon align="right" size="small" 
                            invisible={
                                this.state.confirmPassword && this.state.passwordsMatch ?
                                false :
                                true
                            }>
                                <i className="fas fa-check" />
                            </Icon>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>{intl.formatMessage({ id: 'signin.confirm-password' })}</Form.Label>
                        <Form.Control>
                            <Form.Input
                                color={
                                    this.state.confirmPassword && !this.state.passwordsMatch ?
                                    "danger" :
                                    this.state.confirmPassword && this.state.passwordsMatch ?
                                    "success" :
                                    ""
                                }
                                value={this.state.confirmPassword}
                                onChange={this.handleConfirmPasswordChange}
                                type="password"
                            />
                            <Icon align="left" size="small">
                                <i className="fas fa-key" />
                            </Icon>
                            <Icon align="right" size="small" 
                            invisible={
                                this.state.confirmPassword && !this.state.passwordsMatch ?
                                false :
                                true
                            }>
                                <i className="fas fa-circle-exclamation" />
                            </Icon>
                            <Icon align="right" size="small" 
                            invisible={
                                this.state.confirmPassword && this.state.passwordsMatch ?
                                false :
                                true
                            }>
                                <i className="fas fa-check" />
                            </Icon>
                        </Form.Control>
                        <Form.Help 
                        color="danger">
                            {
                            this.state.confirmPassword && !this.state.passwordsMatch ? 
                            intl.formatMessage({ id: 'signin.password-no-match' }) : 
                            this.state.error ?
                            intl.formatMessage({ id: 'general.error-message' }) :
                            ''
                            }
                        </Form.Help>
                    </Form.Field>
                    <Button
                        color="primary"
                        submit={true}
                        disabled={
                            this.state.userExists || 
                            !this.state.userAvailable ||
                            !this.state.passwordsMatch}
                    >
                        {intl.formatMessage({ id: 'signin.submit' })}
                    </Button>
                </form>
            </Box>
        );
    }
}

export default injectIntl(SignupForm);