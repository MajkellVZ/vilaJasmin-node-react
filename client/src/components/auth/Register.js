import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";

const Register = () => {
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
            console.log(formData);
        } else {
            alert('Passwords do not match');
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

export default Register;