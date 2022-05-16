import React from "react";
import { injectIntl } from "react-intl";
import { Button, Form } from "react-bulma-components";
import { AuthContext } from "../../shared/constants/AuthContext";
import axios from "axios";


class CreateItemForm extends React.Component {
    static contextType = AuthContext;
    state = {
        name: ""
    }

    handleChangeName = (e) => {
        this.setState({name: e.target.value})
    }

    handleChangeDescription = (e) => {
        this.setState({description: e.target.value})
    }


    onSubmitEvent = async (e) => {
        e.preventDefault();
        await this.context.verifySession()
        if ((this.context.user === this.props.userName) || this.context.isAdmin) {
            axios.post(
                '/api/v1/post-item',
                {
                    UserName: this.props.userName,
                    CollectionId: this.props.collectionId,
                    name: this.state.name
                }
            )
        }
    }

    render() {
        const intl = this.props.intl;
        return (
            <form onSubmit={this.onSubmitEvent}>
                <Form.Field>
                    <Form.Label>
                        {intl.formatMessage({ id: "user.items.name" })}
                    </Form.Label>
                    <Form.Control>
                        <Form.Input onChange={this.handleChangeName}/>
                    </Form.Control>
                </Form.Field>
                <Button
                color='info'
                type='submit'
                onSubmit={this.onSubmitEvent}
                disabled={this.state.name ? false : true}
                >
                    {intl.formatMessage({ id: "general.submit" })}
                </Button>
            </form>
        )
    }
}

export default injectIntl(CreateItemForm);