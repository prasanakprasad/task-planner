

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
             <div class="col-4">
              <div class="card ${(status === 'TODO') ? `list-group-item card-todo"` : (status === 'Done') ? `list-group-item card-done"` : `list-group-item card-any"`}
     style = "width:400px" id = "mycard" data-task-id=${id}>
    <div class="card-header">${name}<span class="badge badge-danger">${status}</span></div>
    <div class="card-body">
      <h4 class="card-title"></h4>
      <p class="card-text"></p>
      <p>${description}</p>
      <p>Assigned to: ${assignedTo}</p>
      <p>Due on: ${dueDate} </p>
              
      <div>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-plus" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10zM13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
        </svg>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-day" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          <path
            d="M4.684 11.523v-2.3h2.261v-.61H4.684V6.801h2.464v-.61H4v5.332h.684zm3.296 0h.676V8.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a1.806 1.806 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98v4.105zm2.805-5.093c0 .238.192.425.43.425a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43zm.094 5.093h.672V7.418h-.672v4.105z" />
        </svg>
      </div>
      <button type="button" class="btn btn-primary btn-sm delete-button" > Delete</button>
      ${
    (status === 'Done') ? `<button type="button" class="btn btn-primary btn-sm done-button invisible" > Mark as Done</button>` : `<button type="button" class="btn btn-primary btn-sm done-button visible" > Mark as Done</button>`
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
    console.log("Inside AddTask\n");
    console.log(name, description, assignedTo, dueDate);
    const newTask = new Task(this.currentId, name, description, assignedTo, dueDate, status = 'TODO');

    this.currentId++;
    this.tasks.push(newTask);
    console.log("after add Task Push ", newTask);
  }//addTask

  deleteTask(taskId) {
    console.log("inside delete task", taskId);
    let newTasksList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == taskId) { console.log("same task id and hence moving over"); }
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



  render() {
    let tasksHtmlList = [];
    let tasksHtml = "";

    for (let i = 0; i < this.tasks.length; i++) {

      // looping and storing in task variable
      const task = this.tasks[i];

      // formatting date
      const taskDate = new Date(this.tasks[i].dueDate);
      console.log("test\n");
      console.log(taskDate);
      const formattedDate = `${taskDate.getDay()}/${taskDate.getMonth()}/${taskDate.getFullYear()} `;
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
