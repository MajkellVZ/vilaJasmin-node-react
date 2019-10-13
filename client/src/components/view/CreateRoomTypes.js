import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createRoomType} from "../../actions/room_types";

const CreateRoomTypes = ({createRoomType, auth}) => {
    const [formData, setFormData] = useState({
        name: '',
        price: ''
    });

    const {name, price} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createRoomType(formData);
    };

    return (
        <Fragment>
            <form onSubmit={e => onSubmit(e)}>
                <input type={'text'} name={'name'} onChange={e => onChange(e)}/>
                <br/>
                <input type={'text'} name={'price'} onChange={e => onChange(e)}/>
                <br/>
                <input type={'submit'} value={'Add'}/>
            </form>
        </Fragment>
    )
};

CreateRoomTypes.propTypes = {
    createRoomType: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {createRoomType})(CreateRoomTypes);

