import React from "react";
import { injectIntl } from "react-intl";
import { Button, Form, Heading } from "react-bulma-components";
import { AuthContext } from "../../shared/constants/AuthContext";
import axios from "axios";


class CreateCollectionForm extends React.Component {
    static contextType = AuthContext;
    state = {
        name: "",
        category: "alcohol",
        description: "",
        num0: "",
        num1: "",
        num2: "",
        str0: "",
        str1: "",
        str2: "",
        txt0: "",
        txt1: "",
        txt2: "",
        dat0: "",
        dat1: "",
        dat2: "",
        chk0: "",
        chk1: "",
        chk2: ""
    }

    handleChangeName = (e) => {
        this.setState({name: e.target.value})
    }

    handleChangeCategory = (e) => {
        this.setState({category: e.target.value})
        console.log(e.target.value)
    }

    handleChangeDescription = (e) => {
        this.setState({description: e.target.value})
    }

    handleChangeCustom = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmitEvent = async (e) => {
        e.preventDefault();
        await this.context.verifySession()
        if ((this.context.user === this.props.userName) || this.context.isAdmin) {
            axios.post(
                '/api/v1/post-collection',
                {
                    UserId: this.props.userId,
                    collection: this.state
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
                        {intl.formatMessage({ id: "user.collections.name" })}
                    </Form.Label>
                    <Form.Control>
                        <Form.Input onChange={this.handleChangeName}/>
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Label>
                        {intl.formatMessage({ id: "user.collections.category" })}
                    </Form.Label>
                    <Form.Control>
                        <Form.Select
                        value={this.state.category}
                        onChange={this.handleChangeCategory}
                        >
                            <option value='alcohol'>
                                {intl.formatMessage({ id: "category.alcohol" })}
                            </option>
                            <option value='books'>
                                {intl.formatMessage({ id: "category.books" })}
                            </option>
                            <option value='comics'>
                                {intl.formatMessage({ id: "category.comics" })}
                            </option>
                            <option value='art'>
                                {intl.formatMessage({ id: "category.art" })}
                            </option>
                            <option value='stamps'>
                                {intl.formatMessage({ id: "category.stamps" })}
                            </option>
                            <option value='coins'>
                                {intl.formatMessage({ id: "category.coins" })}
                            </option>
                            <option value='electronics'>
                                {intl.formatMessage({ id: "category.electronics" })}
                            </option>
                        </Form.Select>
                    </Form.Control>
                </Form.Field>
                <Form.Field>
                    <Form.Label>
                        {intl.formatMessage({ id: "user.collections.description" })}
                    </Form.Label>
                    <Form.Textarea onChange={this.handleChangeDescription}/>
                </Form.Field>
                <Heading size={5}>
                    {intl.formatMessage({ id: "user.collections.custom-fields" })}
                </Heading>
                <Form.Label>
                    {intl.formatMessage({ id: "user.collections.custom-field-number" })}
                </Form.Label>
                <Form.Field kind='group'
                >
                    <Form.Input
                        name='num0'
                        onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    /><Form.Input
                    name='num1'
                    onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    /><Form.Input
                    name='num2'
                    onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    />
                </Form.Field>
                <Form.Label>
                    {intl.formatMessage({ id: "user.collections.custom-field-string" })}
                </Form.Label>
                <Form.Field kind='group'>
                    <Form.Input
                        name='str0'
                        onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    /><Form.Input
                    name='str1'
                    onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    /><Form.Input
                    name='str2'
                    onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    />
                </Form.Field>
                <Form.Label>
                    {intl.formatMessage({ id: "user.collections.custom-field-text" })}
                </Form.Label>
                <Form.Field kind='group'>
                    <Form.Input
                        name='txt0'
                        onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    /><Form.Input
                    name='txt1'
                    onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    /><Form.Input
                    name='txt2'
                    onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    />
                </Form.Field>
                <Form.Label>
                    {intl.formatMessage({ id: "user.collections.custom-field-date" })}
                </Form.Label>
                <Form.Field kind='group'>
                    <Form.Input
                        name='dat0'
                        onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    /><Form.Input
                    name='dat1'
                    onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    /><Form.Input
                    name='dat2'
                    onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    />
                </Form.Field>
                <Form.Label>
                    {intl.formatMessage({ id: "user.collections.custom-field-checkbox" })}
                </Form.Label>
                <Form.Field kind='group'>
                    <Form.Input
                        name='chk0'
                        onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    /><Form.Input
                    name='chk1'
                    onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    /><Form.Input
                    name='chk2'
                    onChange={this.handleChangeCustom}
                        placeholder={intl.formatMessage({ id: "user.collections.custom-field-name" })}
                    />
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

export default injectIntl(CreateCollectionForm);