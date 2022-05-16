import axios from "axios";
import React from "react";
import { Button, Card, Content, Heading, Media, Tag, Form, Icon } from "react-bulma-components";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/constants/AuthContext";

class ItemBrief extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || "Test Item",
            category: this.props.category || "Test Category",
            createdAt: this.props.createdAt || "today",
            tags: ["foo", "bar", "baz"],
            likeCount: this.props.likeCount || 0,
            commentCount: this.props.commentCount || 0,
            user: this.props.user || "Alice",
            collection: this.props.collectionName || "Foobarbaz"
        }
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
    
    render() {
        const intl = this.props.intl;
        return (
            <Card>
                <Card.Header>
                    <Card.Header.Title textSize={3}>
                    <Link to={`/item/${this.props.id}`}>
                        {this.state.name}
                    </Link>
                    </Card.Header.Title>
                </Card.Header>
                <Card.Content>
                    <Content>
                    <Tag.Group>
                        <Tag>{this.state.tags[0]}</Tag>
                        <Tag>{this.state.tags[1]}</Tag>
                        <Tag>{this.state.tags[2]}</Tag>
                    </Tag.Group>
                    <p>
                        <strong>{intl.formatMessage({id: "item.brief.user"})}: </strong>
                        <Link to={`/profile/${this.state.user}`}>
                        {this.state.user}
                        </Link>
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "item.brief.collection"})}: </strong>
                        <Link to={`/collection/${this.props.collectionId}`}>
                        {this.state.collection}
                        </Link>
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "item.brief.category"})}: </strong>{this.state.category}
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "item.brief.uploaded"})}: </strong>{this.state.createdAt}
                    </p>
                        <Button.Group>
                            <Button
                            onClick={this.handleLikeToggle}
                            >
                                <Icon align="left" size="small">
                                    <i className="fas fa-heart" />
                                </Icon>
                                <strong></strong>{this.state.likeCount}
                            </Button>
                            <Button>
                                <Icon align="left" size="small">
                                    <i className="fas fa-envelope" />
                                </Icon>
                                <strong></strong>{this.state.commentCount}
                            </Button>
                        </Button.Group>
                    </Content>
                </Card.Content>
            </Card>
        );
    }
}

export default injectIntl(ItemBrief);