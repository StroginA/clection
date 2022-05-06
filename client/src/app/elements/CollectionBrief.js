import React from "react";
import { Button, Card, Content, Tag } from "react-bulma-components";
import { injectIntl } from "react-intl";

class CollectionBrief extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || "Test Collection",
            category: this.props.category || "Test Category",
            whenLatestItem: this.props.whenLatestItem || "today",
            tags: this.props.tags || ["foo", "bar", "baz"],
            user: this.props.user || "Alice",
            itemCount: this.props.itemCount || 42,
            imageSrc: ""
        }
    }
    
    render() {
        const intl = this.props.intl;
        return (
            <Card>
                <Card.Header>
                    <Card.Header.Title textSize={3}>{this.state.name}</Card.Header.Title>
                </Card.Header>
                <Card.Image 
                src={this.state.imageSrc}
                fallback="no_img"
                />
                <Card.Content>
                    <Content>
                    <Tag.Group>
                        <Tag>{this.state.tags[0]}</Tag>
                        <Tag>{this.state.tags[1]}</Tag>
                        <Tag>{this.state.tags[2]}</Tag>
                    </Tag.Group>
                    <p>
                        <strong>{intl.formatMessage({id: "collection.brief.category"})}:</strong> {this.state.category}
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "collection.brief.item-count"})}:</strong> {this.state.itemCount}
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "collection.brief.lastadded"})}:</strong> {this.state.whenLatestItem}
                    </p>
                    </Content>
                </Card.Content>
                <Card.Footer>
                    <Button color="info">
                        {intl.formatMessage({id: "collection.brief.morecollection"})}
                    </Button>
                    <Button color="info">
                        {intl.formatMessage({id: "collection.brief.moreuser"})} {this.state.user}
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default injectIntl(CollectionBrief);