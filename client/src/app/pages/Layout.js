import {Outlet} from 'react-router-dom';
import Header from '../../common/header/Header';

function Layout(props) {
    return (
        <div>
            <Header
                currentLocale={props.currentLocale}
                setCurrentLocale={props.setCurrentLocale} />
            <Outlet />
        </div>
    )
};

export default Layout;