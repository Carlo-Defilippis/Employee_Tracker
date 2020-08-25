DROP TABLE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);
 CREATE TABLE role (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(30) UNIQUE NOT NULL,
     salary DECIMAL UNSIGNED NOT NULL,
     department_id INT UNSIGNED NOT NULL,
     INDEX dep_ind (department_id),
     CONSTRAINT fk_department foreign key (department_id) REFERENCES department(id) ON DELETE CASCADE
 );
 CREATE TABLE employee (
     id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INT UNSIGNED NOT NULL,
     INDEX role_ind (department_id),
      CONSTRAINT fk_role foreign key (role_id) REFERENCES role(id)  ON DELETE CASCADE,
     manager_id INT UNSIGNED,
     INDEX man_ind (manager_id),
      CONSTRAINT fk_manager foreign key (manager_id) REFERENCES employee(id)  ON DELETE SET NULL
    --  foriegn key manager_id is referencing employee id 
 );