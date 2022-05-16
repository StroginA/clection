import { Section, Media, Heading } from "react-bulma-components";
import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";


class CommentSection extends React.Component {
    state = {
        comments: []
    }

    componentDidMount = async () => {
        this.fetchComments();
    }

    fetchComments = () => {
        axios.get(
            '/api/v1/fetch-comments',
            {
                params: {
                    id: this.props.id
                }
            }
        )
        .then(
            res => {
                this.setState({
                    comments: res.data.body
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

    Comments = (props) => {
        return (
            <>
                {this.state.comments.map(
                    (props) => {
                        return (
                            <Media key={props.id}>
                                <p>
                                    <Heading size={5}>
                                    <Link to={`/profile/${props.author}`}>{props.author}</Link>
                                    </Heading>
                                    <ReactMarkdown>{props.body}</ReactMarkdown>
                                </p>
                            </Media>
                        )
                    }
                )}
            </>
        )
    }

    render() {
        return (
            <Section>
                <this.Comments />
            </Section>
        )
    }
}

export default CommentSection;