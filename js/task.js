/* const task1 = { id: 1, description: "hello", assigned: "jack" };
const task2 = { id: 1, description: "bye", assigned: "jack" };
const taskManager = {
    getAlltasks: function () { return task1 },
    addTask: function (task) { return task }
};
taskManager.getAlltasks();
{
    id: 1, description: "hello", assigned: "jack"
} */

// -------
const task1 = {
    id: 1,
    name: 'Mow the lawn',
    description: 'Mow the front Lawn',
    assignedTo: ['Jack', 'prameela', 'gowri'],
    dueDate: '2020/09/29',
    status: 'todo'
};
const task2 = {
    id: 2,
    name: 'Mow the lawn 2',
    description: 'Mow the front Lawn 2',
    assignedTo: ['Jack', 'prameela', 'gowri'],
    dueDate: '2020/09/29',
    status: 'todo'
};
const task3 = {
    id: 3,
    name: 'Gardening 3',
    description: 'gardening 2',
    assignedTo: ['prasana'],
    dueDate: '2020/09/29',
    status: 'inprogress'
};
const taskManager = {

    tasks: [task1, task2],//variable

    getAllTasks: function () { //method
        return this.tasks;
    },
    getTasksWithStatus: function (status) { //method
        let tempTasks = [];
        for (let i = 0; i < this.tasks.length; i++) {

            console.log("TYPE OF TASKS[I].STATUS" + typeof (this.tasks[i].status));
            console.log("type of arg status" + typeof (status));
            if (this.tasks[i].status == status)
                tempTasks.push(this.tasks[i]);
            else
                console.log("task not added" + this.tasks[i].name);
        }
        return tempTasks;
    },
    addTask: function (argTask) { //method
        console.log("Inside add task");
        this.tasks.push(argTask);
    },
    deleteTask: function (argTask) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (argTask.id === this.tasks[i].id) {
                console.log("HURRAY");
                delete this.tasks[i];
            }
        }
    }
}

console.log("getAllTasks *****\n", taskManager.getAllTasks());
console.log("adding a Task");
taskManager.addTask(task3);
console.log("after adding a task\n", taskManager.getAllTasks());
// taskManager.deleteTask(task2);
console.log("after deleting task2\n", taskManager.getAllTasks());
console.log("gettasks withstatus\n")
console.log(taskManager.getTasksWithStatus('todo'));