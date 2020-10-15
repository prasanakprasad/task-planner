

class Task {
  constructor(id, name, description, assignedTo, dueDate, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.status = status;
  }
}

createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  let renderHtml = `
             <div class="col-sm-3 my-2 rounded">
              <div class="card text-capitalize ${(status === 'TODO') ? `list-group-item card-todo"` : (status === 'Done') ? `list-group-item card-done"` : `list-group-item card-any"`}
 id = "mycard" data-task-id=${id}>
    <div class="card-header large lead">${name}  <span class="badge  small ${(status === 'TODO') ? `badge-danger ` : `badge-success 
    `}float-right">${status}</span></div>
    <div class="card-body">
      <h4 class="card-title"></h4>
      <p class="card-text"></p>
      <p class="font-weight-bolder">${description}</p>
      <div>
      <label> ${assignedTo}</label>
      <label class="float-right"> ${dueDate} </label>
      </div>
      <i class="fas fa-edit edit-button"></i>&nbsp&nbsp&nbsp&nbsp
      <i class="fas fa-trash delete-button"></i>&nbsp&nbsp&nbsp&nbsp
    ${
      (status === 'Done') ? `<i class="fas fa-check-circle done-button invisible"></i>` :`<i class="fas fa-check-circle done-button visible"></i>`
    }
    </div >
      </div >
      </div > ` ;
  return renderHtml;
}

class TaskManager {

  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }//construtor

  addTask(name, description, assignedTo, dueDate) {
    console.log("Inside taskManager.AddTask\n");
    console.log("taskManager.AddTask",name, description, assignedTo, dueDate);
    const newTask = new Task(this.currentId, name, description, assignedTo, dueDate, status = 'TODO');

    this.currentId++;
    this.tasks.push(newTask);
    console.log("After add Task Push ", newTask);
  }//addTask

  updateTask(taskId,name, description, assignedTo, dueDate) {
    console.log("Inside Update task", taskId);
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == taskId) { 
        console.log("Update Task-->same task id and hence updating it"); 
        this.tasks[i].name= name;
        this.tasks[i].description=description;
        this.tasks[i].assignedTo= assignedTo;
        this.tasks[i].dueDate =dueDate;
      }
    }
  }

  deleteTask(taskId) {
    console.log("Inside delete task", taskId);
    let newTasksList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == taskId) { console.log("Delete Task -->same task id and hence moving over"); }
      else {
        newTasksList.push(this.tasks[i]);
      }
    }
    this.tasks = newTasksList;
  }


  getTaskById(taskId) {
    let foundTask;

    for (let i = 0; i < this.tasks.length; i++) {
      let task = this.tasks[i];

      if (task.id == taskId) {
        foundTask = task;
      } //if
    } //for
    return foundTask;
  } //getTaskById

  //get tasks based on assignedTo
  getTasksByAssignedTo(assignedTo) {
    let selectedTasksList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      if ((this.tasks[i].assignedTo).toUpperCase() == assignedTo.toUpperCase()) {
        selectedTasksList.push(this.tasks[i]);
      }
    }
    return selectedTasksList;
  }

  //get Tasks based on a search text
  //the search text can be part of the name, description or the assignedTo.
  getTasksBySearchText(searchText) {
    searchText = searchText.toUpperCase();
    console.log("inside getTasksBySearchText", searchText);
    let selectedTasksList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.name.toUpperCase().includes(searchText)) {
        selectedTasksList.push(task);
      } else if (task.description.toUpperCase().includes(searchText)) {
        selectedTasksList.push(task);
      } else if (task.assignedTo.toUpperCase().includes(searchText)) {
        selectedTasksList.push(task);
      }
    }
    return selectedTasksList;
  }

  render(tasks = this.tasks) {
    let tasksHtmlList = [];
    let tasksHtml = "";

    for (let i = 0; i < tasks.length; i++) {

      // looping and storing in task variable
      const task = tasks[i];

      // formatting date
      const taskDate = new Date(tasks[i].dueDate);
      console.log("test\n");
      console.log(taskDate);
      const formattedDate = `${taskDate.getDate()}/${taskDate.getMonth()+1}/${taskDate.getFullYear()} `;
      console.log(formattedDate);
      const taskHtml = createTaskHtml(tasks[i].id, tasks[i].name, tasks[i].description, tasks[i].assignedTo, formattedDate, tasks[i].status);

      tasksHtmlList.push(taskHtml);

      tasksHtml = tasksHtml + taskHtml + "\n";

    }
    const taskListElement = document.querySelector("#taskListId");
    taskListElement.innerHTML = tasksHtml;

  }//render

  render1() {
    let tasksHtmlList = [];
    let tasksHtml = "";

    for (let i = 0; i < this.tasks.length; i++) {

      // looping and storing in task variable
      const task = this.tasks[i];

      // formatting date
      const taskDate = new Date(this.tasks[i].dueDate);
      console.log("test\n");
      console.log(taskDate);
      const formattedDate = `${taskDate.getDay()} /${taskDate.getMonth()}/${taskDate.getFullYear()} `;
      console.log(formattedDate);
      const taskHtml = createTaskHtml(this.tasks[i].id, this.tasks[i].name, this.tasks[i].description, this.tasks[i].assignedTo, formattedDate, this.tasks[i].status);

      tasksHtmlList.push(taskHtml);

      tasksHtml = tasksHtml + taskHtml + "\n";

    }
    const taskListElement = document.querySelector("#taskListId");
    taskListElement.innerHTML = tasksHtml;

  }//render
  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
    const currentId = String(this.currentId);
    localStorage.setItem('currentId', currentId);
  }
  load() {
    const tasksJson = localStorage.getItem('tasks');
    if (tasksJson === null) {
      console.log("There are no tasks saved on local storage");
    }
    else {
      console.log("there are some tasks stored", tasksJson);
      this.tasks = JSON.parse(tasksJson);
    }
    const currentId = localStorage.getItem('currentId');
    if (currentId === null) {
      console.log("currentId not yet available in local Storage");
    }
    else {
      this.currentId = Number(currentId);
    }
  }

}
