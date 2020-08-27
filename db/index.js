const connection = require('./connection');
const start = require('../index.js');


console.log("This is the start require in index.js in the DB: ",start);
console.log("==============================================================================");

async function database(connection) {
    
    function findAllDepartments() {
        //missing SQL joins
        return connection.query("SELECT department.id, department.name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name");
    }
    function findAllEmployees() {
        //missing SQL joins & manager
        return connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name FROM employee INNER JOIN role ON role_id=role.id INNER JOIN department ON department.id=role.department_id;", function (err, res) {
            if (err) throw err;
            // console.log("all employees: ", res);
            console.table(res);
            console.log("============================================================");
            
            });
        }
    
    function findAllRole() {
        //missing SQL joins
        return connection.query("SELECT role.id, role.title,role.salary FROM role LEFT JOIN department on role.department_id = department.id");
    }

    //create employee department role

    function createEmployee(employee) {
        return connection.query("INSERT INTO employee SET ?", employee);
       
    }
    function createDepartment(department) {
        return connection.query("INSERT INTO department SET ?", department);
    }
    function createRole(role) {
        return connection.query("INSERT INTO role SET ?",role);
    }

    //delete department roles and employee
    function deleteEmployee(employeeId){
        return connection.query(`DELETE FROM employee WHERE id=${employeeId}`);
    }
    function deleteRole(roleId){
        return connection.query (`DELETE FROM role WHERE id=${roleId}`);
    }
    function deleteDeparment(departmentId){
        return connection.query (`DELETE FROM department WHERE id=${departmentId}`);
    }
}

module.exports = database();