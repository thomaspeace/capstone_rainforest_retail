import React from "react";
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Route,} from 'react-router-dom'

const Navigation = () => (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/vans">Vans</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/map">Map</Link>
    </nav>
);

export default Navigation;