const departmentQuestions = [
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:',
      validate: (input) => {
        return input.trim() !== '' || 'Department name cannot be empty.';
      },
    },
  ];
  
  const roleQuestions = [
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Enter the title of the role:',
      validate: (input) => {
        return input.trim() !== '' || 'Role title cannot be empty.';
      },
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'Enter the salary for the role:',
      validate: (value) => {
        const valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a valid number';
      },
    },
    {
      type: 'input',
      name: 'roleDepartmentId',
      message: 'Enter the department ID for the role:',
      validate: (value) => {
        const valid = !isNaN(parseInt(value));
        return valid || 'Please enter a valid number';
      },
    },
  ];
  
  const employeeQuestions = [
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the role ID for the employee:',
      validate: (value) => {
        const valid = !isNaN(parseInt(value));
        return valid || 'Please enter a valid number';
      },
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'Enter the manager ID for the employee (or leave it blank for no manager):',
      validate: (value) => {
        const valid = value === '' || (!isNaN(parseInt(value)) && value !== null);
        return valid || 'Please enter a valid number or leave it blank for no manager';
      },
    },
  ];
  
  const updateEmployeeRoleQuestions = [
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee you want to update:',
      validate: (value) => {
        const valid = !isNaN(parseInt(value));
        return valid || 'Please enter a valid number';
      },
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: 'Enter the new role ID for the employee:',
      validate: (value) => {
        const valid = !isNaN(parseInt(value));
        return valid || 'Please enter a valid number';
      },
    },
  ];
  
  module.exports = {
    departmentQuestions,
    roleQuestions,
    employeeQuestions,
    updateEmployeeRoleQuestions,
  };
  