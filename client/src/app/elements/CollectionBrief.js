import React from "react";
import { Button, Card, Content, Media } from "react-bulma-components";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";

class CollectionBrief extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name || "Test Collection",
            category: this.props.category || "Test Category",
            user: this.props.user,
            itemCount: this.props.itemCount || 42,
            imageSource: this.props.imageSource || "/logo192.png"
        }
    }
    
    render() {
        const intl = this.props.intl;
        return (
            <Card justifyContent="center">
                <Card.Header>
                    <Card.Header.Title textSize={3}>
                    <Link to={`/collection/${this.state.id}`}>
                        {this.state.name}
                    </Link>
                    </Card.Header.Title>
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
                    <p>
                        <strong>{intl.formatMessage({id: "collection.brief.user"})}: </strong>
                        <Link to={`/profile/${this.state.user}`}>
                        {this.state.user}
                        </Link>
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "collection.brief.category"})}: </strong>
                        {this.state.category}
                    </p>
                    <p>
                        <strong>{intl.formatMessage({id: "collection.brief.item-count"})}: </strong>
                        {this.state.itemCount}
                    </p>
                    </Content>
                </Card.Content>
            </Card>
        );
    }
}

export default injectIntl(CollectionBrief);