import React from "react";
import { Button, Card, Content, Media, Tag } from "react-bulma-components";
import { injectIntl } from "react-intl";

class CollectionBrief extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || "Test Collection",
            category: this.props.category || "Test Category",
            tags: this.props.tags || ["foo", "bar", "baz"],
            user: this.props.user || "Alice",
            itemCount: this.props.itemCount || 42,
            imageSource: this.props.imageSource || "logo192.png"
        }
    }
    
    render() {
        const intl = this.props.intl;
        return (
            <Card justifyContent="center">
                <Card.Header>
                    <Card.Header.Title textSize={3}>{this.state.name}</Card.Header.Title>
                </Card.Header>
                <Card.Content>
                    <Media justifyContent="center">
                <Card.Image
                size={128}
                src={this.state.imageSource}
                fallback="no_img"
                />
                </Media>
                </Card.Content>
                <Card.Content>
                    <Content>
                    <Tag.Group justifyContent="center">
                        <Tag>{this.state.tags[0]}</Tag>
                        <Tag>{this.state.tags[1]}</Tag>
                        <Tag>{this.state.tags[2]}</Tag>
                    </Tag.Group>
                    <p>
                        <strong>{intl.formatMessage({id: "collection.brief.user"})}:</strong> {this.state.user}
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "collection.brief.category"})}:</strong> {this.state.category}
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "collection.brief.item-count"})}:</strong> {this.state.itemCount}
                    </p>
                    </Content>
                </Card.Content>
            </Card>
        );
    }
}

export default injectIntl(CollectionBrief);