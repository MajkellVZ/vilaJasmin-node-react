import React from 'react';
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <Link to={'/bookings'}>Bookings</Link>
            <br/>
            <Link to={'/room-types'}>Room Types</Link>
            <br/>
            <Link to={'/rooms'}>Rooms</Link>
        </div>
    )
};

export default Sidebar;