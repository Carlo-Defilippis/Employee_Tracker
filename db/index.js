const connection = require('./connection');


class DB {
    constructor(connection) {
        this.connection = connection;
    }
    
    findAllDepartments() {
        return this.connection.query("SELECT * FROM department ORDER BY id");
    }



    findAllEmployees() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name FROM employee INNER JOIN role ON role_id=role.id INNER JOIN department ON department.id=role.department_id ORDER BY first_name;");
    }
        
    findAllRole() {
        return this.connection.query("SELECT department.dept_name, role.title, role.salary FROM department INNER JOIN role ON department.id=role.department_id ORDER BY dept_name");
    }

    //create employee department role

    createEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?",  { 
            first_name: employee.first,
            last_name: employee.last,
            role_id: parseInt(employee.role.split(" ")) 
        });
    }
    createDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", {
            dept_Name: department.department,
        });
    }
    createRole(role) {
        return this.connection.query("INSERT INTO role SET ?", {
            title: role.title,
            salary: role.salary,
            department_id: parseInt(role.department.split(" ")),
        });
    }

    //delete department roles and employee
    deleteEmployee(employeeId){
        return this.connection.query(`DELETE FROM employee WHERE role_id = ${employeeId};`);
    }
    deleteRole(roleId){
        return this.connection.query (`DELETE FROM role WHERE id = ${roleId};`);
    }
    deleteDeparment(departmentId){
        this.connection.query (`DELETE FROM department WHERE id=${departmentId};`);
        return this.connection.query (`DELETE FROM role WHERE id=${departmentId};`);
    }
}

module.exports = new DB(connection);