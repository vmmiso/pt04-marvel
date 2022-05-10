import { Outlet, useNavigate } from "react-router-dom";

import { FaSignOutAlt } from 'react-icons/fa';

import { useAuth } from "../hooks/useAuth";
import marvelLogo from "../assets/Marvel.png";
import './Layout.css';

const Layout = () => {
    const { auth, handleLogout } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <div className="header">
                <img src={ marvelLogo } alt="marvel-logo" onClick={ () => navigate('/') }/>
                {/* <img src={ logoFiUpm } alt="FI UPM logo"></img> */}
                {/* { auth?.user
                    ?   <>
                            <span>{ auth.user }<button onClick={ handleLogout }>X</button></span>
                        </>
                    :   <Link to="/login">Login</Link>} */}
                { auth?.username ? <div className="user">{ auth.username } <FaSignOutAlt onClick={ handleLogout } className="signout-button"/></div> : <div /> }
            </div>
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

export default Layout;