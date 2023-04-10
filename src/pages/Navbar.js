import React, { useState } from 'react';
import '../styles/Navbar.css'
import logo from '../assets/images/logo.jpg'

function Navbar() {
    const [showLinks, setShowLinks] = useState(false);

    return (
        <nav>
            <div className="logo">
                <img src={logo} width="64" height="64"></img>
            </div>
            <div className="links" id={showLinks ? "show-nav" : ""}>
                <ul>
                    {/* <input type="text" className="search-box typeahead tt-input mr"
                        placeholder="Search for Movies, Events, Plays, Sports and Activities" autocomplete="off" spellcheck="false" dir="auto"
                        style={{ position: "relative", verticalAlign: "top", backgroundColor: "#fff" }} />
                    <button type="submit" class="btn">Search</button> */}
                    <li className='link'><a style={{ color: "#f5a623" }} href="/">Theater</a></li>
                    <li className='link'><a style={{ color: "#f5a623" }} href="/MovieList">Movies</a></li>
                </ul>
            </div>
            <span className='mr' style={{ color: "#f5a623" }}></span>
        </nav>
    );
}

export default Navbar;
