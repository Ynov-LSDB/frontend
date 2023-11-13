import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Navbar</Link>
            <ul>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/events">Events</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <CustomLink to="/login">Login</CustomLink>
                <CustomLink to="/Profile">Profile</CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const path = window.location.pathname

    return (
        <li className={path === to ? "active" : ''}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}