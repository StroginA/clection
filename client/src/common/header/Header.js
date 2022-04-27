import React from "react";
import LocalePicker from "../localePicker/LocalePicker";

class Header extends React.Component {
    render(){
        return (
            <div class='box'>
                <LocalePicker currentLocale={this.props.currentLocale} onLocaleChanged={this.props.setCurrentLocale} />
            </div>
        );
    }
}

export default Header;
