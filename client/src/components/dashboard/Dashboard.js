import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRoomType} from "../../actions/room_types";

const Dashboard = ({getRoomType, auth, room_type}) => {
    useEffect(() => {
        getRoomType()
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
};

Dashboard.propTypes = {
    getRoomType: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    room_type: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    room_type: state.room_type
});

export default connect(mapStateToProps, {getRoomType})(Dashboard);