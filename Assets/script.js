const express = require('express');
const db = require('../db.js');

const app = express();

app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

//Choose View All Departments

async function viewDepartments(){
    const result = await db.query('SELECT * FROM departments'); 
    }
   
//Add Department
async function addDepartments(newDepartment){
    const result = await db.query(`INSERT INTO departments(department,id) VALUES (${newDepartment})`)
}

//Choose View Roles

async function viewRoles(){
  const result = await db.query('SELECT * FROM roles')
}

//Add Role
async function addRoles(newRole){
  const result = await db.query(`INSERT INTO roles(job_title,id,department,salary) VALUES (${newRoles})`)
}

// Choose View All Employees

//Add Employee

//Update Employee Role

//Exports
exports.viewDepartments = viewDepartments;
exports.addDepartments = addDepartments;
