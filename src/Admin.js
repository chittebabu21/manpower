import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
    // declare state variables
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    // declare useEffect hook
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                // make GET request to Spring Boot API
                const response = await axios.get('http://localhost:8080/employees');
                console.log(response);
                setEmployees(response.data);
            } catch (error) {
                // error handling
                console.error(error);
            }
        };

        // invoke fetchEmployees
        fetchEmployees();
    }, []);

    // format employee id with leading zeros
    const formatEmployeeId = (employeeId) => {
        return employeeId.toString().padStart(5, '0');
    }

    // delete employee
    const deleteEmployee = async (employeeId) => {
        // alert confirmation
        if (window.confirm('Are you sure you want to delete this employee?')) {
            // use axios to make DELETE request
            axios.delete(`http://localhost:8080/employees/${employeeId}`)
                .then((response) => {
                    // remove employee from employees array
                    setEmployees(employees.filter((employee) => employee.employeeId !== employeeId));
                })
                .catch((error) => {
                    // error handling
                    console.error(error);
                });
        }
    }

    // on logout
    const handleLogout = () => {
        // redirect to login page
        navigate('/login');
    }

    // on add employee
    const handleAdd = () => {
        // redirect to add page
        navigate('/add');
    }

    // on edit employee
    const handleEdit = (employeeId) => {
        // redirect to edit page
        navigate(`/edit/${employeeId}`);
    }

    return (
        <div className="container h-100 mt-5">
            <div className="d-flex justify-content-between">
                <h1 className="text-center text-secondary font-weight-bold fs-1 mb-3">Employee List</h1>
                <div className="d-flex">
                    <button className="btn btn-outline-success mb-3 mx-3" type="submit" onClick={handleAdd}>ADD EMPLOYEE</button>
                    <button className="btn btn-outline-primary mb-3 mx-3" type="submit" onClick={handleLogout}>LOGOUT</button>
                </div>
            </div>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date Of Birth</th>
                        <th>Country</th>
                        <th>Contact Number</th>
                        <th>Created On</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employeeId} className="table-hover">
                            <td>
                                <Link className="pe-auto" to={`/edit/${employee.employeeId}`} onClick={handleEdit}>{formatEmployeeId(employee.employeeId)}</Link>
                            </td>
                            <td>{employee.employeeName}</td>
                            <td>{employee.employeeEmail}</td>
                            <td>{employee.dateOfBirth}</td>
                            <td>{employee.country}</td>
                            <td>{employee.contactNumber}</td>
                            <td>{employee.createdOn}</td>
                            <td><button
                                className="btn btn-outline-danger"
                                onClick={() => deleteEmployee(employee.employeeId)}
                            >X</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;