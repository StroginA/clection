import axios from "axios";
import React from "react";
import { Box, Button, Heading, Columns, Block, Icon, Form, Level, Section, Image, Table } from "react-bulma-components";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/constants/AuthContext";
import { injectRouter } from "../../shared/constants/injectRouter";
import CommentSection from "./CommentSection";

class ItemVerbose extends React.Component {
    static contextType = AuthContext;
    state = {
        id: this.props.id,
        name: "",
        category: "",
        user: "",
        likeCount: 0,
        comment: "",
        commentError: ""
    }

    componentDidMount = async () => {
        this.fetchItem();
    }

    fetchItem = () => {
        axios.get(
            '/api/v1/fetch-item',
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
                    collectionName: res.data.collection,
                    collectionId: res.data.CollectionId,
                    createdAt: res.data.createdAt,
                    likeCount: res.data.likeCount
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

    handleLikeToggle = async () => {
        await this.context.verifySession();
        if (this.context.user) {
            axios.post(
                '/api/v1/toggle-like',
                {
                    id: this.props.id,
                    user: this.context.user
                }
            ).then(
                res => {
                    if (res.status === 200) {
                        this.setState({likeCount: this.state.likeCount - 1})
                    } else if (res.status === 201) {
                        this.setState({likeCount: this.state.likeCount + 1})
                    }
                }
            )
        }
    }

    onSubmitEvent = async (e) => {
        e.preventDefault();
        await this.context.verifySession();
        if (this.context.user && this.state.comment) {
            axios.post(
                '/api/v1/post-comment',
                {
                    comment: {
                        author: this.context.user,
                        body: this.state.comment,
                        id: this.state.id
                    }
                }
            )
        } else {
            this.setState({commentError: true})
        }
    }

    handleDeleteItem = async () => {
        await this.context.verifySession();
        if (this.context.isAdmin || this.context.user === this.state.user) {
            axios.delete(
                '/api/v1/delete-item',
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

    render() {
        const intl = this.props.intl;
        return (
            <Box>
                {this.state.errorStatus ?
                <Heading>
                    {
                        this.state.errorStatus === 404 ?
                            intl.formatMessage({ id: 'item.not-found' }) :
                            intl.formatMessage({ id: 'general.error-message' })
                    }
                </Heading> :
                <>
                    <Heading>
                        {this.state.name}
                    </Heading>
                    <Columns>
                    <Columns.Column size='auto'>
                        <Section>
                    <p>
                        <strong>{intl.formatMessage({id: "item.user"})}: </strong>
                        <Link to={`/profile/${this.state.user}`}>
                        {this.state.user}
                        </Link>
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "item.category"})}: </strong>{this.state.category}
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "item.uploaded"})}: </strong>{this.state.createdAt}
                    </p>
                    </Section>
                            <Button
                            onClick={this.handleLikeToggle}
                            >
                                <Icon align="left" size="small">
                                    <i className="fas fa-heart" />
                                </Icon>
                                <strong></strong>{this.state.likeCount}
                            </Button>
                            <Box>
                                <Heading size={4}>
                                {intl.formatMessage({id: "item.comments"})}
                                </Heading>
                                <CommentSection id={this.props.id}/>
                                <form onSubmit={this.onSubmitEvent}>
                                <Form.Field>
                                    <Form.Control>
                                    <Form.Textarea
                                    placeholder={intl.formatMessage({id: "item.comment-label"})}
                                    disabled={!this.context.user}
                                    onChange={(e)=>{
                                        this.setState({comment: e.target.value, commentError: false});
                                    }}
                                    />
                                    <Form.Help
                                    color='danger'
                                    invisible={!this.state.commentError}
                                    >
                                        {intl.formatMessage({id: "item.no-empty-comment"})}
                                    </Form.Help>
                                    </Form.Control>
                                </Form.Field>
                                    <Button
                                        color="primary"
                                        submit={true}
                                        disabled={!this.state.comment}
                                    >
                                        {intl.formatMessage({ id: 'general.submit' })}
                                    </Button>
                                    </form>
                            </Box>
                    </Columns.Column>
                    <Columns.Column size={3}>
                    </Columns.Column>
                    <Columns.Column size={2}>
                    {((this.context.user === this.state.user) || this.context.isAdmin) &&
                                <Button
                                color='danger'
                                onClick={this.handleDeleteItem}
                                >
                                {intl.formatMessage({ id: "item.delete" })}
                                </Button>}
                    </Columns.Column>
                    </Columns>
                </>}
            </Box>
        )
    }
}

export default injectRouter(injectIntl(ItemVerbose));