import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";
import PropTypes from 'prop-types';

const Register = ({setAlert, register}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repeat_password: ''
    });

    const {name, email, password, repeat_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if (password === repeat_password) {
            register({name, email, password});
        } else {
            setAlert('Passwords do not match', 'danger');
        }
    };

    return (
        <Fragment>
            <h1>Sign Up</h1>
            <form onSubmit={e => onSubmit(e)}>
                <input
                    type="text"
                    name="name"
                    required={true}
                    value={name}
                    onChange={e => onChange(e)}
                />
                <br/>
                <input type="text"
                       name="email"
                       required={true}
                       value={email}
                       onChange={e => onChange(e)}
                />
                <br/>
                <input type="password"
                       name="password"
                       required={true}
                       minLength="6"
                       value={password}
                       onChange={e => onChange(e)}
                />
                <br/>
                <input type="password"
                       name="repeat_password"
                       required={true}
                       minLength="6"
                       value={repeat_password}
                       onChange={e => onChange(e)}
                />
                <br/>
                <input type="submit" value="Register"/>
            </form>
            <p>Already have an account? <Link to='/login'>Sign In</Link></p>
        </Fragment>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

export default connect(null, {setAlert, register})(Register);