const fs = require('node:fs');
const inquirer = require('inquirer');
const script = require ('./Assets/script.js');

//Initial Questioning
 async function initialQuestioning(){
        await inquirer.prompt([
        {
            type: 'list',
            name: 'InitialQuestions',
            message:'Choose an Option',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add a Department'],
        }
    ])
    .then(answers => {
        var selection = answers.InitialQuestions;
        handleInitialSelection(selection);
    })
 }

 initialQuestioning();

 async function handleInitialSelection(selection){

    switch(selection){
        case 'View Departments':
            var returnDepartments = await script.viewDepartmentsSQL();
            console.table(returnDepartments.rows)
        break;

        case 'View Roles':
            var returnRoles = await script.viewRolesSQL();
            console.table(returnRoles.rows);
            await addRoleQuery();
        break;


        case 'View Employees':
            var returnEmployees = await script.viewEmployeesSQL();
            console.table(returnEmployees.rows);
            await employeeQuery();
        break;

        case 'Add a Department':
         addDepartmentsQuery();
        break;
    }
}


    //Add Department
async function addDepartmentsQuery(){
     await inquirer.prompt([
         {
                name: 'newDepartment',
                message: 'Add New Department (\'Department Name\', ID)'
         }
     ])
        .then(answers =>{
             var newDepartment = answers.newDepartment;
             console.log(newDepartment);
             script.addDepartmentsSQL(newDepartment);
         })
    
}
//Add Role Query
async function addRoleQuery(){
    await inquirer.prompt([
        {
            name:'roleQuery',
            type: 'list',
            message: 'Do you want to add a new role?',
            choices: ['Yes', 'No']
            
        }
    ])
    .then(answers => {
        console.log(answers.roleQuery);
        if (answers.roleQuery == 'Yes'){
             addRole();
        }
        else {
            initialQuestioning()
        }
    })
  }
//Add Role
async function addRole(){
    await inquirer.prompt([
        {
            name: 'newRole',
            message: 'Add New Role("\'job_title\', id, \'department\', salary")'
        }
    ])
    .then(answers => {
        var newRoles = answers.newRole;
        script.addRolesSQL(newRoles);
    })
    initialQuestioning();
}

//Add and Update Employee Query
async function employeeQuery(){

    inquirer.prompt([
        {
            name: 'employeeQuery',
            type: 'list',
            message:'Do you want to add an employee or update an existing employee?',
            choices:['Add','Update', 'Exit']
        }
    ])
    .then (answers => {
        if (answers.employeeQuery == 'Add'){
            addEmployee();
        }
        else if(answers.employeeQuery == 'Update'){
            updateEmployee();
            //Still need to make this script
        }
        else{
            initialQuestioning()
        }
        })
}



//Add Employee
async function addEmployee(){
    await inquirer.prompt([
        {
            name: 'newEmployee',
            message: 'Add New Employee (employeeid,\'first_name\',\'last_name\',\'job_title\',\'department\',salary,\'manager\')'
        }
    ])
    .then(answers => {
        var newEmployee = answers.newEmployee;
        script.addEmployeesSQL(newEmployee);
        initialQuestioning();
    })
}
//Update Employee Role

async function updateEmployee(){
    await inquirer.prompt([
        {
            name: 'employeeID',
            message: 'Input ID of Employee. (Numerical Value)'
        },
        {
            name: 'employeeRole',
            message: 'Input new role for Employee.(\'Job_Title\')'
        }
    ])
    .then(answers => {
        var role = answers.employeeRole;
        var id = answers.employeeID;
        script.updateEmployeesSQL(role,id);
    })
    initialQuestioning();
}