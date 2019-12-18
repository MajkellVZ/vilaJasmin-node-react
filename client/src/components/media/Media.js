import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getMedia, createMedia, deleteMedia} from "../../actions/media";

const Media = ({match, media, createMedia, getMedia, deleteMedia}) => {
    useEffect(() => {
        getMedia(match.params.name);
    }, [getMedia]);

    const [formData, setFormData] = useState({
        media: []
    });

    const onChooseImage = (e) => {
        setFormData({...formData, media: e.target.files});
    };

    const onUpload = () => {
        createMedia(match.params.name, formData);
    };

    const onDelete = (id) => {
        deleteMedia(id);
    };

    return (
        <Fragment>
            {match.params.name}
            <br/>
            <input type={"file"} name={"media"} onChange={e => onChooseImage(e)} multiple={true}/>
            <input type={"submit"} value={"Upload"} onClick={() => onUpload()}/>
            <br/>
            {media.media.map(img => (
                <div>
                    <img alt={match.params.name} src={`http://localhost:5000/api/media/display/${img.image_path}`}/>
                    <input type={"submit"} value={'x'} onClick={() => onDelete(img._id)}/>
                </div>
            ))}
        </Fragment>
    )
};

Media.propTypes = {
    match: PropTypes.object.isRequired,
    getMedia: PropTypes.func.isRequired,
    media: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    createMedia: PropTypes.func.isRequired,
    deleteMedia: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    media: state.media,
});

export default connect(mapStateToProps, {getMedia, createMedia, deleteMedia})(Media);