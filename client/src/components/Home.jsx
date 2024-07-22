import React from 'react';
import logo from '../assets/Logo.png';

const Home = () => {
    return (
        <div className="home-container">
            <div className="logo-container">
                <img src={logo} alt="Rainforest Retail Logo" className="logo" />
            </div>
            <h2>Welcome to the Dashboard</h2>
            <p>This is the home page of our delivery management system</p>
        </div>
    );
};

export default Home;