package com.springboot.manpower.repository;

import com.springboot.manpower.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created By: Chittebabu
 */

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // method to get employee by email
    Employee findEmployeeByEmployeeEmail(String employeeEmail);
}
