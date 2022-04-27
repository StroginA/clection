import React from "react";
import LocalePicker from "../localePicker/LocalePicker";

class Header extends React.Component ({ currentLocale, setCurrentLocale }) {
    state = {
        currentLocale: {currentLocale}
    }
    render(){
        return (
            <div class='box'>
                <LocalePicker currentLocale={currentLocale} onLocaleChanged={setCurrentLocale} />
            </div>
        )
    }
}

export default Header;
