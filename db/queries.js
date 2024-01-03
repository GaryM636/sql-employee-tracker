const connection = require('./connections');

// Function to view all departments
function viewAllDepartments() {
  return connection.promise().query('SELECT * FROM department');
}

// Function to view all roles
function viewAllRoles() {
  return connection.promise().query('SELECT * FROM role');
}

// Function to view all employees
function viewAllEmployees() {
  return connection.promise().query('SELECT * FROM employee');
}

// Function to check if a role ID exists
async function doesRoleIdExist(roleId) {
  const [rows] = await connection.promise().query('SELECT COUNT(*) AS count FROM role WHERE id = ?', [roleId]);
  return rows[0].count > 0;
}

// Function to check if an employee ID exists
async function doesEmployeeIdExist(employeeId) {
  const [rows] = await connection.promise().query('SELECT COUNT(*) AS count FROM employee WHERE id = ?', [employeeId]);
  return rows[0].count > 0;
}

// Function to check if a department ID exists
async function doesDepartmentIdExist(departmentId) {
  const [rows] = await connection.promise().query('SELECT COUNT(*) AS count FROM department WHERE id = ?', [departmentId]);
  return rows[0].count > 0;
}

// Function to add a department
async function addDepartment(departmentName) {
  await connection.promise().query('INSERT INTO department (name) VALUES (?)', [departmentName]);
}

// Function to add a role
async function addRole(roleTitle, roleSalary, roleDepartmentId) {
  const departmentExists = await doesDepartmentIdExist(roleDepartmentId);

  if (!departmentExists) {
    throw new Error('The specified department ID does not exist.');
  }

  await connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleTitle, roleSalary, roleDepartmentId]);
}

// Function to add an employee
async function addEmployee(firstName, lastName, roleId, managerId) {
  const [roleExists, managerExists] = await Promise.all([doesRoleIdExist(roleId), doesEmployeeIdExist(managerId)]);

  if (!roleExists) {
    throw new Error('The specified role ID does not exist.');
  }

  if (managerId && !managerExists) {
    throw new Error('The specified manager ID does not exist.');
  }

  managerId = managerId === '' ? null : managerId;

  await connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
}


// Function to update an employee role
async function updateEmployeeRole(employeeId, newRoleId) {
  const [roleExists, employeeExists] = await Promise.all([doesRoleIdExist(newRoleId), doesEmployeeIdExist(employeeId)]);

  if (!roleExists) {
    throw new Error('The specified new role ID does not exist.');
  }

  if (!employeeExists) {
    throw new Error('The specified employee ID does not exist.');
  }

  await connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
}

// Function to delete a department by ID
async function deleteDepartment(departmentId) {
  const departmentExists = await doesDepartmentIdExist(departmentId);

  if (!departmentExists) {
    throw new Error('The specified department ID does not exist.');
  }

  await connection.promise().query('DELETE FROM department WHERE id = ?', [departmentId]);
}

// Function to delete a role by ID
async function deleteRole(roleId) {
  const roleExists = await doesRoleIdExist(roleId);

  if (!roleExists) {
    throw new Error('The specified role ID does not exist.');
  }

  await connection.promise().query('DELETE FROM role WHERE id = ?', [roleId]);
}


// Function to delete an employee by ID
async function deleteEmployee(employeeId) {
  const employeeExists = await doesEmployeeIdExist(employeeId);

  if (!employeeExists) {
    throw new Error('The specified employee ID does not exist.');
  }

  await connection.promise().query('DELETE FROM employee WHERE id = ?', [employeeId]);
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
};
