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
const inputStat = document.querySelector('#form-validate-status')

formMain.addEventListener('submit', (event) => {
    event.preventDefault();
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
    if (inputAsnTo.value.length > 7) {
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
    if (inputStat.value !== "") {
        inputStat.classList.add('is-valid');
        inputStat.classList.remove('is-invalid');
    }
    else {
        allIsWell = 'false';
        inputStat.classList.add('is-invalid');
        inputStat.classList.remove('is-valid');
    }

    if (allIsWell == 'true') {
        taskMgr.addTask(inputName.value, inputDesc.value, inputAsnTo.value, inputDD.value);

        //Clearing the form values for the next input
        inputName.value = " ";
        inputDesc.value = " ";
        inputAsnTo.value = " ";
        inputDD.value = " ";
        inputStat.value = " ";
        inputName.classList.remove('is-valid');
        inputDesc.classList.remove('is-valid');
        inputAsnTo.classList.remove('is-valid');
        inputDD.classList.remove('is-valid');
        inputStat.classList.remove('is-valid');
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

});//addEventListener

//let elementsTBC=document.querySelectorAll('.checkBlank');
// for (let i =0; i<elementTBC.length;i++)
// {
// elementsTBC.addEventListener
// }
//go through each elements. input value and do the not empty check and length check. and display proper message.
//but do specific check for the date field.. 
