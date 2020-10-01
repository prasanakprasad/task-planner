describe('#taskManager', () => {
    describe('-test TaskManager initialization', () => {
        it('-should check if the tasks array is empty', () => {
            const TM = new TaskManager(1);
            expect(TM.tasks).toEqual([]);
        })

        it('-should check if the currentId is correct', () => {
            const TM = new TaskManager(1);
            expect(TM.currentId).toEqual(1);
        })
    })

    describe('-addTask', () => {
        it('should add the particular task to the tasks array and check if the first task\'s id is correct', () => {
            //create the new variables to be passed on to the new Tas object
            const id = 0;
            const name = "Allign";
            const description = "align the cards in the co tainer";
            const assignedTo = "prameela";
            const status = "TODO";
            const dueDate = "2/10/2020";

            //call new Task(the variables created above)
            const T = new Task(id, name, description, assignedTo, dueDate, status);
            const T1 = new Task(id, "asdmnbasdbasd", "asdasdasdasdasd", assignedTo, dueDate, status);
            //instantiate taskManager object 
            TM = new TaskManager();

            //call addTask on the TM object and 
            TM.addTask(name, description, assignedTo, dueDate);

            //expect the 1st index of the TM's tasks to be the new Task that was added
            //add object using addTaskMethod
            //check if that position is having that object
            expect(TM.tasks[0]).toEqual(T);
            expect(TM.tasks[0].id).toEqual(0);
            expect(TM.tasks[0]).not.toEqual(T1);
        })
    })

    describe('-deleteTask', () => {
        describe('-should delete the task from the tasks array', () => {
            it('should check if tasks array is empty', () => {
                //instantiate TaskManager object
                const TM = new TaskManager();

                const name = "Allign";
                const description = "align the cards in the co tainer";
                const assignedTo = "prameela";
                const status = "TODO";
                const dueDate = "2/10/2020";

                //add a Task to the tasks Array.--> Mock tasks array
                //Mock 
                TM.tasks[0] = {
                    id: 0, name: "something",
                    description: 'align the cards in the container',
                    assignedTo: 'prameela',
                    dueDate: '02/10/2020',
                    status: 'TODO'
                };
                TM.deleteTask(0);

                //check if TM's tasks arrays empty or the first element is undefined
                // expect(TM.tasks[0]).not.toBeDefined();
                expect(TM.tasks).toEqual([]);
            })
        })
    })

    describe('-getTaskById', () => {
        it('should get the Task object corresponding to id', () => {
            // instantiate a new TaskManager object
            const TM = new TaskManager();

            //mock the TM's tasks array
            TM.tasks[0] = {
                id: 0, name: "something", description: 'align the cards in the container',
                assignedTo: 'prameela', dueDate: '02/10/2020', status: 'TODO'
            };

            /* const temptask = {
                id: 1, name: "thing", description: 'align the cards in the container',
                assignedTo: 'prameela', dueDate: '02/10/2020', status: 'TODO'
            }; */

            // expect(TM.getTaskById(0)).toBe(temptask);
            expect(TM.getTaskById(0)).toBe(TM.tasks[0]);
        })
    })

    describe("Test save to local Storage", () => {
        it('should call the local Storage with the key and JSON String', () => {
            const taskManager = new TaskManager();

            //create a new JSON string too be used for the expect of the Spy
            const task = {
                id: 0,
                name: "something",
                description: 'align the cards in the container',
                assignedTo: 'Gowri',
                dueDate: '02/10/2020',
                status: 'TODO'
            };
            const tasksJson = JSON.stringify([task]);
            //Spy the local Storage setItem method
            const sp = spyOn(localStorage, 'setItem');

            taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate);
            // call save
            taskManager.save();

            //expect the first call to setItem is with the defined tasksjson and the key tasks
            expect(sp.calls.first().args).toEqual(['tasks', tasksJson]);
        })

        it('should call the localStorage with the currentId key and value', () => {
            const taskManager = new TaskManager();

            //create a new JSON string too be used for the expect of the Spy
            const task = {
                id: 0,
                name: "something",
                description: 'align the cards in the container',
                assignedTo: 'Gowri',
                dueDate: '02/10/2020',
                status: 'TODO'
            };

            taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate);

            const currentIdJson = String(taskManager.currentId);
            //Spy the local Storage setItem method
            const sp = spyOn(localStorage, 'setItem');

            // call save
            taskManager.save();

            //expect the first call to setItem is with the defined tasksjson and the key tasks
            expect(sp.calls.mostRecent().args).toEqual(['currentId', currentIdJson]);
        })
    })
})