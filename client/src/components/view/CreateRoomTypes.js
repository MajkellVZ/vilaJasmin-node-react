import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createRoomType, updateRoomType} from "../../actions/room_types";

const CreateRoomTypes = ({createRoomType, updateRoomType, isUpdate, room_type}) => {
    const initialState = {
        name: '',
        price: ''
    };

    useEffect(() => {
        isUpdate && setFormData({...room_type});
    }, [room_type]);

    const [formData, setFormData] = useState(initialState);

    const {name, price} = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onInsert = e => {
        e.preventDefault();
        createRoomType(formData);
    };

    const onUpdate = (e, id) => {
        e.preventDefault();
        updateRoomType(formData, id);
    };

    return (
        <Fragment>
            <form onSubmit={isUpdate ? e => onUpdate(e, room_type._id) : e => onInsert(e)}>
                <input type={'text'} name={'name'} value={name} onChange={e => onChange(e)}/>
                <br/>
                <input type={'text'} name={'price'} value={price} onChange={e => onChange(e)}/>
                <br/>
                <input type={'submit'} value={isUpdate ? 'Update' : 'Add'}/>
            </form>
        </Fragment>
    )
};

CreateRoomTypes.propTypes = {
    createRoomType: PropTypes.func.isRequired,
    updateRoomType: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    room_type: PropTypes.object.isRequired,
    isUpdate: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    room_type: state.room_types.room_type,
});

export default connect(mapStateToProps, {createRoomType, updateRoomType})(CreateRoomTypes);

