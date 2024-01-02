const inquirer = require('inquirer');
const connection = require('./db/connections');
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require('./db/queries');
const { departmentQuestions, roleQuestions, employeeQuestions, updateEmployeeRoleQuestions } = require('./lib/questions');

// Function to start the application
function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'Add Employee',
          'Update Employee Role',
          'View All Roles',
          'Add Role',
          'View All Departments',
          'Add Department',
          'Quit',
        ],
      },
    ])
    .then(async (answers) => {
      switch (answers.action) {
        case 'View All Employees':
          try {
            const [employees] = await viewAllEmployees();
            console.table(employees);
          } catch (error) {
            console.error('Error fetching employees:', error.message);
          }
          startApp();
          break;

        case 'Add Employee':
          inquirer.prompt(employeeQuestions).then(async (answers) => {
            try {
              await addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId);
              console.log('Employee added successfully!');
            } catch (error) {
              console.error('Error adding employee:', error.message);
            }
            startApp();
          });
          break;

        case 'Update Employee Role':
          inquirer.prompt(updateEmployeeRoleQuestions).then(async (answers) => {
            try {
              await updateEmployeeRole(answers.employeeId, answers.newRoleId);
              console.log('Employee role updated successfully!');
            } catch (error) {
              console.error('Error updating employee role:', error.message);
            }
            startApp();
          });
          break;

        case 'View All Roles':
          try {
            const [roles] = await viewAllRoles();
            console.table(roles);
          } catch (error) {
            console.error('Error fetching roles:', error.message);
          }
          startApp();
          break;

        case 'Add Role':
          inquirer.prompt(roleQuestions).then(async (answers) => {
            try {
              await addRole(answers.roleTitle, answers.roleSalary, answers.roleDepartmentId);
              console.log('Role added successfully!');
            } catch (error) {
              console.error('Error adding role:', error.message);
            }
            startApp();
          });
          break;

        case 'View All Departments':
          try {
            const [departments] = await viewAllDepartments();
            console.table(departments);
          } catch (error) {
            console.error('Error fetching departments:', error.message);
          }
          startApp();
          break;

        case 'Add Department':
          inquirer.prompt(departmentQuestions).then(async (answers) => {
            try {
              await addDepartment(answers.departmentName);
              console.log('Department added successfully!');
            } catch (error) {
              console.error('Error adding department:', error.message);
            }
            startApp();
          });
          break;

        case 'Quit':
          connection.end();
          console.log('Connection closed. Goodbye!');
          break;
      }
    });
}

// Start the application
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL database');
    startApp();
  }
});
