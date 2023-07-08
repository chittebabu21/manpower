import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    // declare the state variables
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        employeeName: '',
        employeeEmail: '',
        dateOfBirth: '',
        country: '',
        contactNumber: ''
    });

    // handle change in input
    const handleInputChange = (event) => {
        // update the form data state variables
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    // handle form submission
    const handleSubmit = async (event) => {
        // prevent default form behaviour
        event.preventDefault();

        // check form validity
        if (!validateForm()) {
            return;
        }

        // use axios to add data
        try {
            // send a POST request
            const response = await axios.post(`http://localhost:8080/employees`, formData);

            // clear form and show success message
            setFormData({
                employeeName: '',
                employeeEmail: '',
                dateOfBirth: '',
                country: '',
                contactNumber: ''
            });

            // clear error message
            setError('');

            // console log the response
            console.log(response);

            // send alert
            alert('Employee added successfully!');

            // navigate to admin page
            navigate('/admin');
        } catch (error) {
            // handle error
            console.error(error);

            // set error message in error state variable
            setError('Unable to add employee. Please try again.');
        }
    }

    // validate form method
    const validateForm = () => {
        // check if form has incomplete / invalid data
        if (
            formData.employeeName.trim() === '' ||
            formData.employeeEmail.trim() === '' ||
            formData.dateOfBirth.trim() === '' ||
            formData.country.trim() === '' ||
            formData.contactNumber.trim() === ''
        ) {
            // reset form
            setFormData({
                employeeName: '',
                employeeEmail: '',
                dateOfBirth: '',
                country: '',
                contactNumber: ''
            });
            
            // set error message
            setError('All fields are mandatory!');
            return false;
        }

        // set true if form is valid
        setError('');
        return true;
    }

    // redirect if cancel
    const handleCancel = () => {
        // redirect to admin page
        navigate('/admin');
    }

    return (
        <div className="container h-100 d-flex align-items-center flex-column mt-5">
            <h1 className="text-left text-secondary font-weight-bold fs-1 mb-3">Add Employee</h1>
            <form className="w-50 border border-dark rounded-3 px-5 py-3 me-0" onSubmit={handleSubmit}>
                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="employeeName">Name: </label>
                    <input 
                        type="text"
                        className="form-control"
                        name="employeeName"
                        id="employeeName"
                        value={formData.employeeName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="employeeEmail">Email: </label>
                    <input 
                        type="email"
                        className="form-control"
                        name="employeeEmail"
                        id="employeeEmail"
                        value={formData.employeeEmail}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="dateOfBirth">Date Of Birth: </label>
                    <input 
                        type="date"
                        className="form-control"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="country">Country: </label>
                    <input 
                        type="text"
                        className="form-control"
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="contactNumber">Contact Number: </label>
                    <input 
                        type="tel"
                        className="form-control"
                        name="contactNumber"
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <p className="text-danger text-center mt-3">{error}</p>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary me-2" type="submit">SAVE</button>
                    <button className="btn btn-outline-secondary ms-2" onClick={handleCancel}>CANCEL</button>
                </div>
            </form>
        </div>
    );
}

export default Add;