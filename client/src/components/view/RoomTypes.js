import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getRoomTypes, deleteRoomType, getRoomType} from "../../actions/room_types";
import Spinner from "../layout/Spinner";
import CreateRoomTypes from "./CreateRoomTypes";

const RoomTypes = ({getRoomTypes, getRoomType, deleteRoomType, room_types}) => {
    useEffect(() => {
        getRoomTypes();
    }, [getRoomTypes]);

    const [formData, setFormData] = useState({
        isUpdate: false
    });

    const {isUpdate} = formData;

    const onDelete = (id) => {
        deleteRoomType(id);
    };

    const onEdit = (id) => {
        getRoomType(id);
        setFormData({...formData, isUpdate: true})
    };

    const onAddButton = () => {
        setFormData({...formData, isUpdate: false})
    };

    return room_types.loading ? (
        <Spinner/>
    ) : (
        <Fragment>
            <select name={"room_types"} >
                <option key={"0"} value={"null"}>Choose Room Type</option>
                {room_types.room_types.room_types.map(room_type => (
                        <option value={room_type._id} key={room_type._id}>{room_type.name}</option>
                    )
                )}
            </select>
            <CreateRoomTypes isUpdate={isUpdate}/>
            <input type={'submit'} value={'Add Room Type'} onClick={() => onAddButton()}/>
            {room_types.room_types.room_types.map(room_type => (
                    <div>
                        <span>{room_type.name} {room_type.price}</span>
                        <input type={'submit'} value={'Edit'} onClick={() => onEdit(room_type._id)}/>
                        <input type={'submit'} value={'Delete'} onClick={() => onDelete(room_type._id)}/>
                        <br/>
                    </div>
                )
            )}
            {room_types.room_types.total_pages > 0 &&
            <div>
                <input type={'submit'} value={'First'} onClick={() => getRoomTypes()}/>
                {room_types.room_types.page <= 0 ? '' : <input type={'submit'} value={'Previous'}
                                                               onClick={() => getRoomTypes(room_types.room_types.page - 1)}/>}
                <input type={'submit'} value={'Current'}/>
                {room_types.room_types.page >= room_types.room_types.total_pages ? '' :
                    <input type={'submit'} value={'Next'}
                           onClick={() => getRoomTypes(room_types.room_types.page + 1)}/>}
                <input type={'submit'} value={'Last'} onClick={() => getRoomTypes(room_types.room_types.total_pages)}/>
            </div>
            }
        </Fragment>)
};

RoomTypes.propTypes = {
    getRoomTypes: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    room_types: PropTypes.object.isRequired,
    deleteRoomType: PropTypes.func.isRequired,
    getRoomType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    room_types: state.room_types,
});

export default connect(mapStateToProps, {getRoomTypes, deleteRoomType, getRoomType})(RoomTypes);