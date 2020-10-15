//select the form --form-validate
// select the input text type field
//addEvenet listener on form's submit event and do the validation after event.preventdefault

const taskMgr = new TaskManager();
taskMgr.load();
taskMgr.render();

const formMain = document.querySelector('#form-validate');
const inputName = document.querySelector('#form-validate-name');
const inputDesc = document.querySelector('#form-validate-desc');
const inputAsnTo = document.querySelector('#form-validate-assignto');
const inputDD = document.querySelector('#form-validate-dt');
// const inputStat = document.querySelector('#form-validate-status')

formMain.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("event is **** ",event);
    let allIsWell = 'true';
    if (inputName.value.length > 2) {
        inputName.classList.add('is-valid');
        inputName.classList.remove('is-invalid');
    }
    else {
        allIsWell = 'false';
        inputName.classList.add('is-invalid');
        inputName.classList.remove('is-valid');
    }
    //Check Description
    if (inputDesc.value.length > 5 && inputDesc.value.length < 250) {
        inputDesc.classList.add('is-valid');
        inputDesc.classList.remove('is-invalid');
    }
    else {
        allIsWell = 'false';
        inputDesc.classList.add('is-invalid');
        inputDesc.classList.remove('is-valid');
    }
    //check assignto
    if (inputAsnTo.value.length > 3) {
        inputAsnTo.classList.add('is-valid');
        inputAsnTo.classList.remove('is-invalid');
    }
    else {
        allIsWell = 'false';
        inputAsnTo.classList.add('is-invalid');
        inputAsnTo.classList.remove('is-valid');
    }
    //date
    if (new Date(inputDD.value) > new Date()) {
        inputDD.classList.add('is-valid');
        inputDD.classList.remove('is-invalid');
    }
    else {
        allIsWell = 'false';
        inputDD.classList.add('is-invalid');
        inputDD.classList.remove('is-valid');
    }
    //status
    /* if (inputStat.value !== "") {
        inputStat.classList.add('is-valid');
        inputStat.classList.remove('is-invalid');
    }
    else {
        allIsWell = 'false';
        inputStat.classList.add('is-invalid');
        inputStat.classList.remove('is-valid');
    } */

    if (allIsWell == 'true') {
        //if its from modify submit call updateTask else call addTask
        if(event.submitter.classList.contains('modify-button')){

            console.log("Just before updateTask");
            console.log("modify desc is",inputDesc.value);

            const modifyButton = document.querySelector("#form-submit");
            const taskId=modifyButton.getAttribute('data-task-id');
            
            console.log("modify button taskid is",modifyButton.getAttribute('data-task-id'));
            
            modifyButton.classList.remove("modify-button")
            document.querySelector(".modal-title").innerHTML = "Add New Task details";
            document.querySelector("#form-submit").innerHTML = "Submit";
            taskMgr.updateTask(taskId,inputName.value, inputDesc.value, inputAsnTo.value, inputDD.value);
        }
        else{
        taskMgr.addTask(inputName.value, inputDesc.value, inputAsnTo.value, inputDD.value);
        }
        //Clearing the form values for the next input
        inputName.value = " ";
        inputDesc.value = " ";
        inputAsnTo.value = " ";
        inputDD.value = " ";
        // inputStat.value = " ";
        inputName.classList.remove('is-valid');
        inputDesc.classList.remove('is-valid');
        inputAsnTo.classList.remove('is-valid');
        inputDD.classList.remove('is-valid');
        // inputStat.classList.remove('is-valid');
    }
    else {
        console.log("Validations did not go through");
    }
    taskMgr.render();
    taskMgr.save();
});

// selecting id where we display tasks in index.html
const taskListElement = document.querySelector("#taskListId");

// adding addEventListener to html element where we render html content
taskListElement.addEventListener('click', (event) => {            // "event" here is the event parameter

    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentNode.parentNode;
        let taskId = parentTask.dataset.taskId;
        taskId = Number(taskId);
        const task = taskMgr.getTaskById(taskId);
        task.status = "Done";
        taskMgr.render();
        taskMgr.save();
    } // if
    if (event.target.classList.contains('delete-button')) {
        const parentTask = event.target.parentNode.parentNode;
        let taskId = parentTask.dataset.taskId;
        taskId = Number(taskId);
        console.log("dataset.taskid", taskId);
        taskMgr.deleteTask(taskId);
        taskMgr.save();
        taskMgr.render();
    }
     if (event.target.classList.contains('edit-button')) {
         //dynamically updateModal and populate the task details
        //get the details of the card on to a new update Task Modal

        const parentTask = event.target.parentNode.parentNode;
        let taskId = parentTask.dataset.taskId;
        taskId = Number(taskId);
        let task =taskMgr.getTaskById(taskId);

        document.querySelector(".modal-title").innerHTML = "Modify existing Task details";
        
        console.log("task name is",task.name);
        document.querySelector('#form-validate-name').value= task.name;
        document.querySelector('#form-validate-desc').value = task.description;
        document.querySelector('#form-validate-assignto').value = task.assignedTo;
        document.querySelector('#form-validate-dt').value = task.dueDate;
        
        const modifyButton = document.querySelector("#form-submit");
        modifyButton.innerHTML="Modify";
        modifyButton.classList.add("modify-button")
        modifyButton.setAttribute('data-task-id', taskId);
        $('#myModal').modal('show');
    } 
});//addEventListener

const closeButton = document.querySelector('.close');

closeButton.addEventListener('click',(event)=>{
        const modifyButton = document.querySelector("#form-submit");
        modifyButton.classList.remove("modify-button")
        document.querySelector('.modal-title').value ="Add New Task details";
        document.querySelector('#form-submit').value="Submit";
        document.querySelector('#form-validate-name').value ="";
        document.querySelector('#form-validate-desc').value ="";
        document.querySelector('#form-validate-assignto').value ="";
        document.querySelector('#form-validate-dt').value ="";
})
const findElement = document.querySelector('#search');

findElement.addEventListener('click', (event) => {
    event.preventDefault();

    const searchInput = document.querySelector('#form-search-input').value;
    //check if there is a text in the search input, if there is carry on calling getTasksByAssignedTo
    if (searchInput !== '') {
        const selectedTasks = taskMgr.getTasksBySearchText(searchInput);
        taskMgr.render(selectedTasks);
    }
})

const assigneeElement = document.querySelector('#dropDownMenuLink');

assigneeElement.addEventListener('click', (event) => {
    event.preventDefault();
    const searchBy = event.target.innerHTML;
    if (searchBy !== '') {
        console.log("inside", searchBy);
        const selectedTasks = taskMgr.getTasksByAssignedTo(searchBy);
        taskMgr.render(selectedTasks);
    }
})


//let elementsTBC=document.querySelectorAll('.checkBlank');
// for (let i =0; i<elementTBC.length;i++)
// {
// elementsTBC.addEventListener
// }
//go through each elements. input value and do the not empty check and length check. and display proper message.
//but do specific check for the date field.. 
