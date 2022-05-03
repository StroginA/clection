import React from "react";
import { Box, Columns, Heading } from "react-bulma-components";
import SigninForm from "../forms/SigninForm";
import SignupForm from "../forms/SignupForm";

class SigninPage extends React.Component {
    render() {
        return (
            <Box>
                <Columns centered='true'>
                    <Columns.Column>
                        <SignupForm />
                    </Columns.Column>
                    <Columns.Column>
                        <SigninForm />
                    </Columns.Column>
                </Columns>
            </Box>
        );
    }
}

export default SigninPage;