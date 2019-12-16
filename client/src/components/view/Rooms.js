import React, {Fragment, useEffect, useState} from 'react';
import CreateRoom from "./CreateRoom";
import PropTypes from 'prop-types';
import {getRooms, deleteRoom, getRoom} from "../../actions/rooms";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {getRoomTypes} from "../../actions/room_types";

const Rooms = ({getRooms, deleteRoom, getRoomTypes, getRoom, rooms, room_types}) => {
    useEffect(() => {
        getRoomTypes();
        getRooms();
    }, []);

    const [formData, setFormData] = useState({
        isUpdate: false
    });

    const {isUpdate} = formData;

    const onEdit = (id) => {
        getRoom(id);
        setFormData({...formData, isUpdate: true})
    };

    const onDelete = (id) => {
        deleteRoom(id);
    };

    const onAddButton = () => {
        setFormData({...formData, isUpdate: false})
    };

    return rooms.loading ? <Spinner/> :
        <Fragment>
            <CreateRoom isUpdate={isUpdate} room_types={room_types}/>
            <input type={'submit'} value={'Add Room'} onClick={() => onAddButton()}/>
            {rooms.rooms.rooms.map(room => (
                    <div>
                        <span>{room.room_number} {room.price}</span>
                        <input type={'submit'} value={'Edit'} onClick={() => onEdit(room._id)}/>
                        <input type={'submit'} value={'Delete'} onClick={() => onDelete(room._id)}/>
                        <br/>
                    </div>
                )
            )}
            {rooms.rooms.total_pages > 0 &&
            <div>
                <input type={'submit'} value={'First'} onClick={() => getRooms()}/>
                {rooms.rooms.page <= 0 ? '' : <input type={'submit'} value={'Previous'}
                                                     onClick={() => getRooms(rooms.rooms.page - 1)}/>}
                <input type={'submit'} value={'Current'}/>
                {rooms.rooms.page >= rooms.rooms.total_pages ? '' :
                    <input type={'submit'} value={'Next'}
                           onClick={() => getRooms(rooms.rooms.page + 1)}/>}
                <input type={'submit'} value={'Last'} onClick={() => getRooms(rooms.rooms.total_pages)}/>
            </div>
            }
        </Fragment>
};

Rooms.propTypes = {
    getRooms: PropTypes.func.isRequired,
    getRoom: PropTypes.func.isRequired,
    getRoomTypes: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    deleteRoom: PropTypes.func.isRequired,
    room_types: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    rooms: state.rooms,
    room_types: state.room_types
});

export default connect(mapStateToProps, {getRooms, deleteRoom, getRoomTypes, getRoom})(Rooms);