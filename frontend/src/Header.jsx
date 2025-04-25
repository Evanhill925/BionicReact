import React from 'react';


const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="/path-to-logo/logo.png" alt="Logo" />
            </div>
            <nav className="nav">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/gallery">Gallery</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;