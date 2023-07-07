package com.springboot.manpower.service;

import com.springboot.manpower.model.Employee;
import com.springboot.manpower.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created By: Chittebabu
 */

@Service
@Transactional
public class EmployeeService {
    // get access to repository
    @Autowired
    private EmployeeRepository employeeRepository;

    // method to get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // method to get employee by id
    public Employee getEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId).get();
    }

    // method to find employee by email
    public Employee findEmployeeByEmail(String employeeEmail) {
        return employeeRepository.findEmployeeByEmployeeEmail(employeeEmail);
    }

    // post new employee
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // delete employee by id
    public void deleteEmployee(Long employeeId) {
        employeeRepository.deleteById(employeeId);
    }
}
