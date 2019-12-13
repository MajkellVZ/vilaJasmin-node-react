import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from "../layout/Spinner";

const Dashboard = ({auth: {user, loading}}) => {

    return loading && user === null ? <Spinner/> : <Fragment>
        <h1>Hello {user && user.name}</h1>
    </Fragment>
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);