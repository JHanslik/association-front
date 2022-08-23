import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header className="container-fluid text-center py-3">
            <h1>
                <Link to={"../"} className="text-decoration-none text-light">
                    Associations
                </Link>
            </h1>
            <h2>
                <Link to={"../admin"} className="admin text-decoration-none">
                    Admin
                </Link>
            </h2>
        </header>
    );
}

export default Header;
