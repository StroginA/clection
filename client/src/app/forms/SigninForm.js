import React from "react";
import { injectIntl } from "react-intl";
import { Box, Form, Icon, Heading, Button } from "react-bulma-components";

class SigninForm extends React.Component {
    state = {
        username: "",
        password: "",
        invalidCredentials: false
    }

    setUsername = (x) => {this.setState({username: x})};
    setPassword = (x) => {this.setState({password: x})};
    onSubmitEvent = (e) => {
        e.preventDefault();
    }

    render() {
        const intl = this.props.intl;
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
                                onChange={(e) => {
                                    this.setUsername(e.target.value);
                                    this.setState({invalidCredentials: false});
                                }}
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
                                onChange={(e) => {
                                    this.setPassword(e.target.value);
                                    this.setState({invalidCredentials: false});
                                }}
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
                            {this.state.invalidCredentials ? 
                            intl.formatMessage({ id: 'signin.invalid-credentials' }) : 
                            ''}
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

export default injectIntl(SigninForm);