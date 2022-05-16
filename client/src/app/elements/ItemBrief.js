import React from "react";
import { Button, Card, Content, Heading, Media, Tag, Form, Icon } from "react-bulma-components";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";

class ItemBrief extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || "Test Item",
            category: this.props.category || "Test Category",
            createdAt: this.props.createdAt || "today",
            tags: ["foo", "bar", "baz"],
            likes: 12345,
            commentCount: 345,
            user: this.props.user || "Alice",
            collection: this.props.collectionName || "Foobarbaz"
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
                        <Link to={`profile/${this.state.user}`}>
                        {this.state.user}
                        </Link>
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "item.brief.category"})}: </strong>{this.state.category}
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "item.brief.uploaded"})}: </strong>{this.state.createdAt}
                    </p>
                        <Button.Group>
                            <Button>
                                <Icon align="left" size="small">
                                    <i className="fas fa-heart" />
                                </Icon>
                                <strong></strong>{this.state.likes}
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