const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const { inherits } = require("util");
const { async } = require("rxjs");
require("console.table");


const util = require("util");
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "6822",
    database: "employee_trackerDB"
});

connection.connect();

connection.query = util.promisify(connection.query);


function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadMainPrompts();
}

init(); 

// async function loadMainPrompts() {
//   const { choice } = await prompt([
//     {
//       type: "list",
//       name: "choice",
//       message: "What would you like to do?",
//       choices: [
//         {
//           name: "View all employees",
//           value: "VIEW_EMPLOYEES",
//         },
//         {
//           name: "View all employees by department",
//           value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
//         },
//         {
//           name: "View all employees by manager",
//           value: "VIEW_EMPLOYEES_BY_MANAGER",
//         },
//         {
//           name: "Add employee",
//           value: "ADD_EMPLOYEE",
//         },
//         {
//           name: "Remove employee",
//           value: "REMOVE_EMPLOYEE",
//         },
//         {
//           name: "Update employee role",
//           value: "UPDATE_EMPLOYEE_ROLE",
//         },
//         {
//           name: "Update employee manager",
//           value: "UPDATE_EMPLOYEE_MANAGER",
//         },
//         {
//           name: "View all roles",
//           value: "VIEW_ROLES",
//         },
//         {
//           name: "Add role",
//           value: "ADD_ROLE",
//         },
//         {
//           name: "Remove role",
//           value: "REMOVE_ROLE",
//         },
//         {
//           name: "View all departments",
//           value: "VIEW_DEPARTMENTS",
//         },
//         {
//           name: "Add department",
//           value: "ADD_DEPARTMENT",
//         },
//         {
//           name: "Remove department",
//           value: "REMOVE_DEPARTMENTS",
//         },
//         {
//           name: "Quit",
//           value: "QUIT",
//         }
//       ]
//     }
//   ]);
// }
// //   switch (choice) {
//     case "VIEW_EMPLOYEES":
//       return viewEmployees();
//     case "VIEW_EMPLOYEES_BY_DEPARTMENT":
//       return viewEmployeesByDepartment();
//     case "VIEW_EMPLOYEES_BY_MANAGER":
//       return viewEmployeesByManager();
//     case "ADD_EMPLOYEE":
//       return addEmployee();
//     case "REMOVE_EMPLOYEE":
//   return removeEmployee();
//   case "UPDATE_EMPLOYEE_ROLE":
//       return updateEmployeeRole();
//     case "VIEW_DEPARTMENT":
//       return viewDepartments();
//     case "ADD_DEPARTMENT":
//       return addDepartment();
//     case "REMOVE_DEPARTMENT":
//       return removeDepartment();
//     case "VIEW_ROLES":
//       return viewRoles();
//     case "ADD_ROLE":
//       return addRole();
//     case "REMOVE_ROLE":
//       return removeRole();
//     default:
//       return quit();
//   }
// }

// async function viewEmployees() {
//     var query = "SELECT first_name, last_name FROM employees.employee";
//     var employeeArr = [];
//     connection.query(query, function(err, res){
//         // var stringifyRes = JSON.stringify(res);
//         // console.log("stringifyRes: ", stringifyRes);
//         console.log(JSON.parse(JSON.stringify(res)));
//         let data = JSON.parse(JSON.stringify(res));
//         for (var i = 0; i < data.length; i++){
//             employeeArr.push(data[i].first_name + " " + data[i].last_name);
//         }
//         console.table("Employees", employeeArr);
//         loadMainPrompts();
//     });
    
// }

// async function viewEmployeesByDepartment() {
//     const departments = await db.findAllDepartments();

//     const departmentChoices = departments.map(( {id, name} ) => ({
//         name: name,
//         value: id
//     }));
// }

// function addRole() {
//     var dept = "SELECT name FROM department";
//     connection.query(dept, function(err,res) {
//         let data = JSON.parse(JSON.stringify(res));
//         let departmentArr = [];
//         for(var i = 0; i < data.length; i++){
//             departmentArr.push(data[i].name);
//         }
//         console.log("dept Arr: ", departmentArr);
//         inquirer
//             .prompt([
//                 {
//                     type: "list",
//                     message: "Choose the department to add the role too: ",
//                     choices: departmentArr,
//                     name: "department"
//                 }
//             ]);
//             loadMainPrompts();
//     });
// }

// function quit() {
//     process.exit(0);
// }

// Dependcies

async function loadMainPrompts() {
  const answer = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View all employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "View all employees by department",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
          },
          {
            name: "View all employees by manager",
            value: "VIEW_EMPLOYEES_BY_MANAGER",
          },
          {
            name: "Add employee",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "Remove employee",
            value: "REMOVE_EMPLOYEE",
          },
          {
            name: "Update employee role",
            value: "UPDATE_EMPLOYEE_ROLE",
          },
          {
            name: "Update employee manager",
            value: "UPDATE_EMPLOYEE_MANAGER",
          },
          {
            name: "View all roles",
            value: "VIEW_ROLES",
          },
          {
            name: "Add role",
            value: "ADD_ROLE",
          },
          {
            name: "Remove role",
            value: "REMOVE_ROLE",
          },
          {
            name: "View all departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "Add department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "Remove department",
            value: "REMOVE_DEPARTMENTS",
          },
          {
            name: "Quit",
            value: "QUIT",
          }
        ]
      }
    ]).then(function (answer) {
    switch (answer.choice) {
      case "VIEW_EMPLOYEES":
        return viewEmployees();
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        return viewEmployeesByDepartment();
      case "VIEW_EMPLOYEES_BY_MANAGER":
        return viewEmployeesByManager();
      case "ADD_EMPLOYEE":
        return addEmployee();
      case "REMOVE_EMPLOYEE":
        return removeEmployee();
      case "UPDATE_EMPLOYEE_ROLE":
        return updateEmployeeRole();
      case "VIEW_DEPARTMENT":
        return viewDepartments();
      case "ADD_DEPARTMENT":
        return addDepartment();
      case "REMOVE_DEPARTMENT":
        return removeDepartment();
      case "VIEW_ROLES":
        return viewRole();
      case "ADD_ROLE":
        return addRole();
      case "REMOVE_ROLE":
        return removeRole();
      default:
        return quit();
    }
});
}
// view all departments
function viewDepartments() {
  var query = "SELECT * FROM department ORDER BY id";
  connection.query(query, function (err, res) {
    if (err) throw err;
    // console.log("all departments: ", res);
    console.table(res);
    console.log("============================================================");
    loadMainPrompts();
  });
}
// view employees with their role title, role salary, and dept_name
function viewEmployees() {
  var query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name FROM employee INNER JOIN role ON role_id=role.id INNER JOIN department ON department.id=role.department_id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    // console.log("all employees: ", res);
    console.table(res);
    console.log("============================================================");
    loadMainPrompts();
  });
}
// view roles combined with the department name
function viewRole() {
  var query =
    "SELECT department.dept_name, role.title, role.salary FROM department INNER JOIN role ON department.id=role.department_id ORDER BY dept_name";
  connection.query(query, function (err, res) {
    if (err) throw err;
    // console.log("all roles: ", res);
    console.table(res);
    console.log("============================================================");
    loadMainPrompts();
  });
}

// add a new department - must be unique
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department you want to add?",
      name: "department",
    })
    .then(function (answer) {
      var query = "INSERT INTO department SET ?";
      connection.query(query, { dept_name: answer.department }, function (
        err,
        res
      ) {
        if (err) throw err;
        console.log("added new department");
        console.log(
          "============================================================"
        );
        loadMainPrompts();
      });
    });
}

// add a new employee with first and last name, and role title
function addEmployee() {
  var empRole = "SELECT * FROM role ORDER BY id";
  connection.query(empRole, function (err, res) {
    if (err) throw err;
    var empArr = [];
    for (var i = 0; i < res.length; i++) {
      empArr.push(res[i].id + ": " + res[i].title);
    }
    console.log("empArr: ", empArr);
    inquirer.prompt([
        {
          type: "input",
          message: "What is employee's first name?",
          name: "first",
        },
        {
          type: "input",
          message: "What is employee's last name?",
          name: "last",
        },
        {
          type: "list",
          message: "What is employee's job title?",
          choices: empArr,
          name: "role",
        },
      ])
      .then(function (answer) {
        var query = "INSERT INTO employee SET ?";
        connection.query(
          query,
          {
            first_name: answer.first,
            last_name: answer.last,
            role_id: parseInt(answer.role.split(" ")),
          },
          function (err, res) {
            if (err) throw err;
            console.log("Added new employee");
            console.log(
              "============================================================"
            );
            loadMainPrompts();
          }
        );
      });
  });
}

// add a new role from the existing deptartments with base salary
function addRole() {
  var dept = "SELECT * FROM department ORDER BY id";
  connection.query(dept, function (err, res) {
    var deptArr = [];
    for (var i = 0; i < res.length; i++) {
      deptArr.push(res[i].id + ": " + res[i].dept_name);
    }
    inquirer
      .prompt([
        {
          type: "list",
          message: "Choose the department to add the role too:",
          choices: deptArr,
          name: "department",
        },
        {
          type: "input",
          message: "What is title of the role you want to add?",
          name: "role",
        },
        {
          type: "number",
          message: "What is the starting salary?",
          name: "salary",
        },
      ])
      .then(function (answer) {
        console.log("answer: ", answer);
        var query = "INSERT INTO role SET ?";
        connection.query(
          query,
          {
            title: answer.role,
            salary: answer.salary,
            department_id: parseInt(answer.department.split(" ")),
          },
          function (err, res) {
            if (err) throw err;
            console.log("Added new role");
            console.log(
              "============================================================"
            );
            loadMainPrompts();
          }
        );
      });
  });
}
// exit out of the application
function quit() {
  process.exit(0);
}