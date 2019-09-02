import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
                <a onClick={logout} href='#'>Logout</a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/register'>Sign Up</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <div>
            <h1>Navbar</h1>
            {!loading && (
                <Fragment>
                    {isAuthenticated ? authLinks : guestLinks}
                </Fragment>
            )}
        </div>
    )
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);