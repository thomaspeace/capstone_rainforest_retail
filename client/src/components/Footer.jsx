import React from 'react';
import './styles/Footer.css';
import {Link} from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
    return (
        <footer className="footer">
            <p>
            <i className="fa-regular fa-copyright"> </i> {new Date().getFullYear()} Rainforest Retail. All rights reserved.
            </p>
            {/* <p>
            <Link to="/about-us" className="footer-link">About Us</Link>
            </p> */}
            <p>Contact Us</p>
        </footer>
    );
};

export default Footer;
