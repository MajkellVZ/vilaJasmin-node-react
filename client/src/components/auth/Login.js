import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        console.log('Success');
    };

    return (
        <Fragment>
            <h1>Sign In</h1>
            <form onSubmit={e => onSubmit(e)}>
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
                <input type="submit" value="Login"/>
            </form>
            <p>Wanna sign up? <Link to='/register'>Sign Up</Link></p>
        </Fragment>
    )
};

export default Login;