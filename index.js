const express = require('express');
const app = express();

app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});


const tasks = [
    { id: 1, name: "Task 1", isDone: false },
    { id: 2, name: "Task 2", isDone: false }
];

const cors = require('cors');
app.use(cors());

let taskId = tasks.length;


app.get("/tasks", (request, response) => {
    response.json(tasks);
});


app.get("/tasks/:id", (request, response) => {
    const id = request.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));

    if (task) {
        response.json(task);
    } else {
        response.status(404).send();
    }
});

app.post("/tasks", (request, response) => {
    taskId++;
    request.body.id = taskId;
    request.body.isDone = false;
    tasks.push(request.body);
    response.status(201).json(request.body);
});

// PATCH 
app.patch("/tasks/:id", (request, response) => {
    const id = request.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));

    if (task) {
        
        if (request.body.isDone !== undefined) {
            task.isDone = request.body.isDone;
            response.json(task);
        } else {
            response.status(400).json({ error: "Invalid request, 'isDone' field is required" });
        }
    } else {
        response.status(404).json({ error: "Task not found" });
    }
});

// PUT 
app.put("/tasks/:id", (request, response) => {
    const id = request.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

    if (taskIndex !== -1) {
        const updatedTask = { id: parseInt(id), ...request.body }; 
        tasks[taskIndex] = updatedTask; 
        response.json(updatedTask);
    } else {
        response.status(404).json({ error: "Task not found" });
    }
});

//DELETE
app.delete("/tasks/:id", (request, response) => {
    const id = request.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); // Remove the task from the array
        response.status(204).send(); // No content response
    } else {
        response.status(404).json({ error: "Task not found" });
    }
});










