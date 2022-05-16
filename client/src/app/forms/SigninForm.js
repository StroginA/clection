import React from "react";
import { injectIntl } from "react-intl";
import { Box, Form, Icon, Heading, Button } from "react-bulma-components";
import axios from "axios";
import { AuthContext } from "../../shared/constants/AuthContext";
import { injectRouter } from "../../shared/constants/injectRouter";

class SigninForm extends React.Component {
    static contextType = AuthContext;

    state = {
        username: "",
        password: "",
        invalidCredentials: false,
        sessionExpired: false,
        error: false
    }

    navigate = this.props.navigate;

    handleUsernameChange = (e) => {
        this.setUsername(e.target.value);
        this.setState({invalidCredentials: false});
        this.setState({error: false});
    }

    handlePasswordChange = (e) => {
        this.setPassword(e.target.value);
        this.setState({invalidCredentials: false});
        this.setState({error: false});
    }

    setUsername = (x) => {this.setState({username: x})};
    setPassword = (x) => {this.setState({password: x})};
    onSubmitEvent = (e) => {
        //stub
        //implement hash+salt later!!!
        e.preventDefault();
        axios.post(
            '/api/v1/signin-attempt',
            {
                auth:
                {
                    username: this.state.username,
                    password: this.state.password
                }
            })
            .then(
                // Implement signin 
                res => {
                    this.context.signin(res.data);
                    this.navigate("/");
                }
            )
            .catch(
                err => {
                    console.log(err);
                    if (err.response.status === 401) {
                        this.setState({ invalidCredentials: true })
                    } else {
                        console.log(err.response.data.message);
                        this.setState({ error: true });
                    }
                }
            );
    }
    
    render() {
        const intl = this.props.intl;
        if (this.props.location.state) {
            this.setState({sessionExpired: true});
            this.props.location.state = "";
        };
        return (
            <Box>
                <form onSubmit={this.onSubmitEvent}>
                    <Heading>{intl.formatMessage({ id: 'signin.signin' })}</Heading>
                    <Form.Field>
                        <Form.Label>{intl.formatMessage({ id: 'signin.username' })}</Form.Label>
                        <Form.Control>
                            <Form.Input
                                color={this.state.invalidCredentials ? "danger" : ""}
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                            />
                            <Icon align="left" size="small">
                                <i className="fas fa-user" />
                            </Icon>
                            <Icon align="right" size="small" invisible={!this.state.invalidCredentials}>
                                <i className="fas fa-circle-exclamation" />
                            </Icon>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>{intl.formatMessage({ id: 'signin.password' })}</Form.Label>
                        <Form.Control>
                            <Form.Input
                                color={this.state.invalidCredentials ? "danger" : ""}
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                type="password"
                            />
                            <Icon align="left" size="small">
                                <i className="fas fa-key" />
                            </Icon>
                            <Icon align="right" size="small" invisible={!this.state.invalidCredentials}>
                                <i className="fas fa-circle-exclamation" />
                            </Icon>
                        </Form.Control>
                        <Form.Help color="danger">
                            {
                            this.state.invalidCredentials ? 
                            intl.formatMessage({ id: 'signin.invalid-credentials' }) : 
                            this.state.error ?
                            intl.formatMessage({ id: 'general.error-message' }) :
                            this.state.sessionExpired ?
                            intl.formatMessage({ id: 'signin.session-expired' }) :
                            ''
                            }
                        </Form.Help>
                    </Form.Field>
                    <Button
                        color="primary"
                        submit={true}
                    >
                        {intl.formatMessage({ id: 'signin.submit' })}
                    </Button>
                </form>
            </Box>
        );
    }
}

export default injectRouter(injectIntl(SigninForm));