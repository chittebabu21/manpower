package com.springboot.manpower.controller;

import com.springboot.manpower.model.Employee;
import com.springboot.manpower.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

/**
 * Created By: Chittebabu
 */

@RestController
@RequestMapping("/employees")
@CrossOrigin("*")
public class EmployeeController {
    // get access to service class
    @Autowired
    private EmployeeService employeeService;

    // test method
    @GetMapping("/test")
    public String test() {
        return "Testing 1, 2, 3...";
    }

    // get all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // get employee by id
    @GetMapping("/{employeeId}")
    public Employee getEmployeeById(@PathVariable Long employeeId) {
        return employeeService.getEmployeeById(employeeId);
    }

    // save new employee
    @PostMapping
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) throws URISyntaxException {
        Employee newEmployee = employeeService.createEmployee(employee);
        return ResponseEntity.created(new URI("/employees/" + newEmployee.getEmployeeId())).body(newEmployee);
    }

    // update employee by id
    @PutMapping("/{employeeId}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long employeeId, @RequestBody Employee employee) {
        // get employee by id
        Employee existingEmployee = employeeService.getEmployeeById(employeeId);

        // check if employee exists
        if (existingEmployee != null) {
            // set employee data
            existingEmployee.setEmployeeName(employee.getEmployeeName());
            existingEmployee.setEmployeeEmail(employee.getEmployeeEmail());
            existingEmployee.setDateOfBirth(employee.getDateOfBirth());
            existingEmployee.setCountry(employee.getCountry());
            existingEmployee.setContactNumber(employee.getContactNumber());

            // save updated details
            Employee updatedEmployee = employeeService.createEmployee(existingEmployee);

            // return response
            return ResponseEntity.ok(updatedEmployee);
        } else {
            // return error response
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // delete employee by id
    @DeleteMapping("/{employeeId}")
    public String deleteEmployee(@PathVariable Long employeeId) {
        // get employee by id
        Employee existingEmployee = employeeService.getEmployeeById(employeeId);

        // check if employee exists
        if (existingEmployee != null) {
            String employeeName = existingEmployee.getEmployeeName();
            employeeService.deleteEmployee(employeeId);
            return "Employee name: " + employeeName + " has been deleted from the database.";
        } else {
            return "Employee not found...";
        }
    }
}
