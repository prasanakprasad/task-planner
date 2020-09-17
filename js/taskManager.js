

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

  createTaskHtml = (name, description, assignedTo, dueDate, status) => {
      const renderHtml = `
      <div class="col-4">
    <div class="card list-group-item" style="width:400px" id="mycard">
    <div class="card-header">${name}</div>
    <!-- <img class="card-img-top" src="img_avatar1.png" alt="Card image"> -->
    <div class="card-body">
      <h4 class="card-title"></h4>
      <!-- <p>Mow the Lawn</p> -->
      <p class="card-text">.</p>
      <p>${description}</p>
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
      </div>`;

     return renderHtml;
  }
  
  class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }
    addTask(name, description, assignedTo, dueDate) {
        console.log("Inside AddTask\n");
        console.log(name, description, assignedTo, dueDate);
        this.currentId++;
        const newTask = new Task(this.currentId, name, description, assignedTo, dueDate, status = 'TODO');
        this.tasks.push(newTask);
    }
    render (){
        let tasksHtmlList =[];
        let tasksHtml = "";

        for  (let i=0; i<this.tasks.length;i++) 
                {
           const task = this.tasks[i];
           const taskDate = new Date(this.tasks[i].dueDate);
           console.log("test\n");
           console.log(taskDate);
           const formattedDate = `${taskDate.getDay()} / ${taskDate.getMonth()} / ${taskDate.getFullYear()}`;
           console.log(formattedDate);
           const taskHtml = createTaskHtml(this.tasks[i].name, this.tasks[i].description, this.tasks[i].assignedTo, this.tasks[i].dueDate, this.tasks[i].staus);
           tasksHtmlList.push(taskHtml);
           tasksHtml = tasksHtml + taskHtml;
           
        }
        const taskListElement = document.querySelector("#taskListId");
        taskListElement.innerHTML=tasksHtml;

           
        
        }

    }
