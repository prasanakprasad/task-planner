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
}