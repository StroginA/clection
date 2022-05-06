import React from "react";
import { Button, Card, Content, Heading, Media, Tag } from "react-bulma-components";
import { injectIntl } from "react-intl";

class ItemBrief extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Test Item",
            category: "Test Category",
            whenUploaded: "today",
            tags: ["foo", "bar", "baz"],
            likes: 0,
            commentCount: 0,
            user: "Alice",
            collection: "Foobarbaz"
        }
    }
    
    render() {
        const intl = this.props.intl;
        return (
            <Card>
                <Card.Header>
                    <Card.Header.Title textSize={3}>{this.state.name}</Card.Header.Title>
                </Card.Header>
                <Card.Content>
                    <Content>
                    <Tag.Group>
                        <Tag>{this.state.tags[0]}</Tag>
                        <Tag>{this.state.tags[1]}</Tag>
                        <Tag>{this.state.tags[2]}</Tag>
                    </Tag.Group>
                    <p>
                        <strong>{intl.formatMessage({id: "item.brief.category"})}:</strong> {this.state.category}
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "item.brief.likes"})}:</strong> {this.state.likes}
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "item.brief.comments"})}:</strong> {this.state.commentCount}
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "item.brief.uploaded"})}:</strong> {this.state.whenUploaded}
                    </p>
                    </Content>
                </Card.Content>
                <Card.Footer>
                    <Button color="info">
                        {intl.formatMessage({id: "item.brief.moreuser"})} {this.state.user}
                    </Button>
                    <Button color="info">
                        {intl.formatMessage({id: "item.brief.morecollection"})} {this.state.collection}
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default injectIntl(ItemBrief);