const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const { inherits } = require("util");
const { async } = require("rxjs");
require("console.table");
var connection = require("./db/connection.js");
var emoji = require('node-emoji');
var CLI = require('clui')

const util = require("util");
const { clearScreenDown } = require("readline");
// const mysql = require('mysql');

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log(emoji.get('coffee') + " Connected as id " + connection.threadId + " " + emoji.get('coffee'));
});
connection.query = util.promisify(connection.query);


function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

loadMainPrompts();
}

async function loadMainPrompts() {
  console.log("This is the load prompts function")
  const { choice } = await inquirer.prompt([
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
          }, new inquirer.Separator()
        ]
      }
    ]);

  
switch (choice) {
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
  case "VIEW_DEPARTMENTS":
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
}


init();
// view all departments
async function viewDepartments() {
  const departments = await db.findAllDepartments();
    console.table(departments);
    loadMainPrompts();
}





// view employees with their role title, role salary, and dept_name
async function viewEmployees() {
  const employees = await db.findAllEmployees();
    console.table(employees);
    loadMainPrompts();
}





// view roles combined with the department name
async function viewRole() {
  const roles = await db.findAllRole();
    console.table(roles);
    loadMainPrompts();
}

// add a new department - must be unique
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department you want to add?",
      name: "department",
    })
    .then(async function (answer) {
      const addDepart = await db.createDepartment(answer);
      console.table(addDepart);
      loadMainPrompts();
      });
    };

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
      deptArr.push(res[i].id + ": " + res[i].dept_Name);
    }
    console.log(deptArr)
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
          name: "title",
        },
        {
          type: "number",
          message: "What is the starting salary?",
          name: "salary",
        },
      ])
      .then(async function (answer) {
        // var query = "INSERT INTO role SET ?";
        const addRole = await db.createRole(answer);
        const showRoles = await db.findAllRole();
        console.table(showRoles);
        console.log(emoji.get('heart') + "  New role added! " + emoji.get('heart'));
        loadMainPrompts();
      });
  });
}



// exit out of the application
function quit() {
Spinner = CLI.Spinner; 
var countdown = new Spinner('  Thank you for using my employees app! Exiting in 5 seconds...  ' + emoji.get('heart'), ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']); 
countdown.start(); 
var number = 5;
setInterval(function () {
  number--;
  countdown.message('  Thank you for using my employees app! Exiting in ' + number + ' seconds...  ' + emoji.get('heart'));
  if (number === 0) {
    process.stdout.write('\n');
    process.exit(0);
  }
}, 500);
}

exports.data = loadMainPrompts;