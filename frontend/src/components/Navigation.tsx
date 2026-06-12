import {Link} from "react-router";

export const Navigation = () => {
    return (
        <nav id="navigation">
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/users'}>Users</Link></li>
                <li><Link to={'/about'}>About</Link></li>
            </ul>
        </nav>
    )
}