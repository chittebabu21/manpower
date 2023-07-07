package com.springboot.manpower.model;
/**
 * Created By: Chittebabu
 */

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

// annotations
@Entity
@Table(name = "employees")
@Data
public class Employee {
    // properties
    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY)
    @Column(name = "employee_id", nullable = false, columnDefinition = "INT(5) ZEROFILL AUTO_INCREMENT PRIMARY KEY")
    private Long employeeId;

    @Column(name = "employee_name", nullable = false)
    private String employeeName;

    @Column(name = "employee_email", nullable = false, unique = true)
    private String employeeEmail;

    @Column(name = "date_of_birth", nullable = false)
    private String dateOfBirth;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "contact_number", nullable = false)
    private String contactNumber;

    @Column(name = "created_on", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private String createdOn;

    // method to convert the string to local date object
    public LocalDate getDateOfBirth() {
        return LocalDate.parse(dateOfBirth, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    // method to set the date of birth field
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    // method to format the timestamp object
    @PrePersist
    private void setCreatedOn() {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.createdOn = dateFormat.format(timestamp);
    }
}
