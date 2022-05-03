import React from "react";
import { injectIntl } from "react-intl";
import { Box, Form, Icon, Heading, Button } from "react-bulma-components";

class SignupForm extends React.Component {
    state = {
        username: "",
        password: "",
        userExists: false
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
                    <Heading>{intl.formatMessage({ id: 'signin.signup' })}</Heading>
                    <Form.Field>
                        <Form.Label>{intl.formatMessage({ id: 'signin.username' })}</Form.Label>
                        <Form.Control>
                            <Form.Input
                                color={this.state.userExists ? "danger" : ""}
                                value={this.state.username}
                                onChange={(e) => {
                                    this.setUsername(e.target.value);
                                    this.setState({userExists: false});
                                    if (e.target.value=='test') {
                                        this.setState({userExists: true});
                                    }
                                }}
                            />
                            <Icon align="left" size="small">
                                <i className="fas fa-user" />
                            </Icon>
                            <Icon align="right" size="small" invisible={!this.state.userExists}>
                                <i className="fas fa-circle-exclamation" />
                            </Icon>
                        </Form.Control>
                        <Form.Help color="danger">
                            {this.state.userExists ? 
                            intl.formatMessage({ id: 'signin.user-exists' }) : 
                            ''}
                        </Form.Help>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>{intl.formatMessage({ id: 'signin.password' })}</Form.Label>
                        <Form.Control>
                            <Form.Input
                                value={this.state.password}
                                onChange={(e) => {
                                    this.setPassword(e.target.value);
                                }}
                                type="password"
                            />
                            <Icon align="left" size="small">
                                <i className="fas fa-key" />
                            </Icon>
                            <Icon align="right" size="small" invisible={true}>
                                <i className="fas fa-circle-exclamation" />
                            </Icon>
                        </Form.Control>
                    </Form.Field>
                    <Button
                        color="primary"
                        submit={true}
                        disabled={this.state.userExists}
                    >
                        {intl.formatMessage({ id: 'signin.submit' })}
                    </Button>
                </form>
            </Box>
        );
    }
}

export default injectIntl(SignupForm);