const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors());


// for postgres, change this to actually read from the server
var tasks = [
    { id: 0, task_name: 'complete app', count: 0, breaks: 0, edit: false },
    { id: 1, task_name: 'finish backend', count: 0, breaks: 0, edit: false },
    { id: 2, task_name: 'add postgres', count: 0, breaks: 0, edit: false },
];

// Create tasks
app.post('/api/tasks', jsonParser, (req, res) => {
    tasks.push({
        id: tasks.length + 1,
        ...req.body, 
    })
    res.status(200).json(1)
});

// Read the tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

//update
app.put('/api/tasks/:id', jsonParser, (req, res) => {
    tasks = tasks.map(task => {
        if (task.id === parseInt(req.params.id)) {
            return {
                ...task,
                task_name: req.body.task_name
            }
        } else {
            return task
        }
    })
    res.status(200).json(1)
})

//delete
app.delete('/api/tasks/:id', (req, res) => { 
    tasks = tasks.filter(task => task.id != req.params.id)
    res.status(200).json(1)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);