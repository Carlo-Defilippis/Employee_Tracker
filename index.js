const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const { inherits } = require("util");
const { async } = require("rxjs");
require("console.table");
var connection = require("./db/connection.js");
var emoji = require('node-emoji');
var CLI = require('clui');
const util = require("util");

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log(emoji.get('coffee') + " Connected as id " + connection.threadId + " " + emoji.get('coffee'));
});
connection.query = util.promisify(connection.query);


function start() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

loadMainPrompts();
}

async function loadMainPrompts() {
  console.log("This is the load prompts function");
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
          },
        ]
      }
    ]);

  
switch (choice) {
  case "VIEW_EMPLOYEES":
    return viewEmployees();
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

start();
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
      const showDept = await db.findAllDepartments();
      console.table(showDept);
      console.log(emoji.get('heart') + "  New department added! " + emoji.get('heart'));
      loadMainPrompts();
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
      .then(async function (answer) {
            const addEmp = await db.createEmployee(answer);
            const showEmp = await db.findAllEmployees();
            console.table(showEmp);
            console.log(emoji.get('heart') + "  New employee added! " + emoji.get('heart'));
            loadMainPrompts();
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
    console.log(deptArr);
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
