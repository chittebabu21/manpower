import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
    // declare the state variables
    const { employeeId } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        employeeName: '',
        employeeEmail: '',
        dateOfBirth: '',
        country: '',
        contactNumber: ''
    });

    // declare useEffect hook
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                // get employee by id
                const response = await axios.get(`http://localhost:8080/employees/${employeeId}`);

                // set employee and form data state variables
                setEmployee(response.data);

                // set form data state variables
                setFormData({
                    employeeName: response.data.employeeName,
                    employeeEmail: response.data.employeeEmail,
                    dateOfBirth: response.data.dateOfBirth,
                    country: response.data.country,
                    contactNumber: response.data.contactNumber
                });
            } catch (error) {
                // error handling
                console.error(error);
            }
        };

        // invoke fetchEmployee
        fetchEmployee();
    }, [employeeId]);

    // handle save
    const handleSave = async (event) => {
        // prevent default form behaviour
        event.preventDefault();

        // check form validity
        if (!validateForm()) {
            return;
        }

        // use axios to update data
        try {
            // send a PUT request
            const response = axios.put(`http://localhost:8080/employees/${parseInt(employeeId)}`, formData);
            console.log(response);

            // clear error message
            setError('');

            // send alert
            alert('Employee updated successfully!');

            // navigate to admin page
            navigate('/admin');
        } catch (error) {
            // error handling
            console.error(error);

            // set error message
            setError('Unable to complete request. Please try again later.');
        }
    }

    // validate form method
    const validateForm = () => {
        if (
            formData.employeeName.trim().length === 0 ||
            formData.employeeEmail.trim().length === 0 ||
            formData.dateOfBirth.trim().length === 0 ||
            formData.country.trim().length === 0 ||
            formData.contactNumber.trim().length === 0
        ) {
            // reset form
            setFormData({
                employeeName: employee.employeeName,
                employeeEmail: employee.employeeEmail,
                dateOfBirth: employee.dateOfBirth,
                country: employee.country,
                contactNumber: employee.contactNumber
            });

            // set error message
            setError('All fields are mandatory!');

            // return false
            return false;
        }
        // clear error messages
        setError('');

        // return true
        return true;
    }

    // handle cancel click
    const handleCancel = () => {
        // redirect to admin page
        navigate('/admin');
    }

    // handle form data change
    const handleChange = (event) => {
        // update form data state
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    // format employee id with leading zeros
    const formatEmployeeId = (employeeId) => {
        return employeeId.toString().padStart(5, '0');
    }
    
    // if employee is null
    if (!employee) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container h-100 d-flex align-items-center flex-column mt-5">
            <h1 className="text-left text-secondary font-weight-bold fs-1 mb-3">Edit Employee</h1>
            <div className="row w-50 border border-dark rounded-3 px-5 py-3 me-0">
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="employeeId" className="form-label">ID</label>
                    <h4 className="text-primary fs-6">{formatEmployeeId(employee.employeeId)}</h4>
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="employeeName" className="form-label">Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="employeeName"
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="employeeEmail" className="form-label">Email</label>
                    <input 
                        type="email"
                        className="form-control"
                        id="employeeEmail"
                        name="employeeEmail"
                        value={formData.employeeEmail}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="dateOfBirth" className="form-label">Date Of Birth</label>
                    <input 
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="contactNumber" className="form-labell">Contact Number</label>
                    <input 
                        type="tel"
                        className="form-control"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />
                </div>
                <p className="text-danger">{error}</p>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary me-2" onClick={handleSave}>SAVE</button>
                    <button className="btn btn-outline-secondary ms-2" onClick={handleCancel}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}

export default Edit;