import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // set email and password state variables
    const adminEmail = 'admin@manpower.com';
    const adminPassword = 'admin123';

    // declare use state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // declare event handlers
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    // handle login 
    const handleSubmit = (event) => {
        // prevent default behaviour
        event.preventDefault();

        // check if email and password are correct
        if (email === adminEmail && password === adminPassword) {
            // alert message
            alert('Login successful');

            // redirect to admin page
            navigate('/admin');
        } else {
            // display error message
            setError('Invalid email or password');

            // clear email and password
            setEmail('');
            setPassword('');
        }
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <h1 className="text-left text-secondary font-weight-bold fs-1 mb-5">Admin Login</h1>
                <div className="col-lg-3">
                    <form className="form-group" onSubmit={handleSubmit}>
                        <label className="form-label w-100">Email: </label>
                        <input 
                            type="email" 
                            className="form-control width-25 border border-dark rounded-3 mb-2"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <label className="form-label w-100">Password: </label>
                        <input 
                            type="password" 
                            className="form-control width-25 border border-dark rounded-3 mb-2"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <p className="text-danger">{error}</p>
                        <button type="submit" className="btn btn-outline-success my-3">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;