import React from 'react';
import './styles/Footer.css';
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import logoImage from '../assets/Logo.png';  

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={logoImage} alt="Rainforest Retail Logo" className="mini-logo" />
                </div>
                <p>
                    <i className="fa-regular fa-copyright"></i> {new Date().getFullYear()} Rainforest Retail. All rights reserved.
                </p>
                <div>
                    <Link to="/about-us" className="footer-link">About Us</Link>
                    <Link to="/contact-us" className="footer-link">Contact Us</Link>
                    <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
                </div>
                <div className="footer-social-icons">
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;