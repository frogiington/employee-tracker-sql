const express = require('express');
const db = require('../db.js');

const app = express();

//Choose View All Departments

async function viewDepartmentsSQL(){
    const result = await db.query('SELECT * FROM departments'); 
    return result;
    }
   
//Add Department
async function addDepartmentsSQL(newDepartment){
    const result = await db.query(`INSERT INTO departments(department,id) VALUES (${newDepartment})`)
    console.log('Successfully added Department.');
    return result;
    
}

//Choose View Roles

async function viewRolesSQL(){
  const result = await db.query('SELECT * FROM roles'); 
  return result;
}


//Add Role
async function addRolesSQL(newRoles){
  const result = await db.query(`INSERT INTO roles(job_title,id,department,salary) VALUES (${newRoles})`);
  console.log("Successfully added new role.");
  return result;
}

// Choose View All Employees

async function viewEmployeesSQL(){
  const result = await db.query('SELECT * FROM employees');
  return result;
}

//Add Employee
async function addEmployeesSQL(newEmployee){
  const result = await db.query(`INSERT INTO employees(employeeid,first_name,last_name,job_titles,department,salaries,manager) VALUES (${newEmployee})`);
  console.log("Successfully added new employee.");
  return result;
}
//Update Employee Role
async function updateEmployeesSQL(role, id){
  const result = await db.query(`Update employees SET job_titles = (${role}) WHERE employeeid = (${id})`);
  console.log('Successfully added employee.');
  return result;
}
//Exports

exports.viewDepartmentsSQL = viewDepartmentsSQL;
exports.addDepartmentsSQL = addDepartmentsSQL;
exports.viewRolesSQL = viewRolesSQL;
exports.addRolesSQL = addRolesSQL;
exports.viewEmployeesSQL = viewEmployeesSQL;
exports.addEmployeesSQL = addEmployeesSQL;
exports.updateEmployeesSQL = updateEmployeesSQL;
