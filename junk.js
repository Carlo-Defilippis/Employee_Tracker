
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