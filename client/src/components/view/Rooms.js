import React, {Fragment, useEffect, useState} from 'react';
import CreateRoom from "./CreateRoom";
import PropTypes from 'prop-types';
import Sidebar from "../layout/Sidebar";
import {getRooms, deleteRoom, getRoom} from "../../actions/rooms";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";

const Rooms = ({getRooms, deleteRoom, auth, rooms}) => {
    useEffect(() => {
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
            <CreateRoom isUpdate={isUpdate}/>
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
    auth: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    deleteRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    rooms: state.rooms,
});

export default connect(mapStateToProps, {getRooms, deleteRoom})(Rooms);