const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const { Pool, Client } = require('pg')
const connectionString = 'postgresql://tester2:testing@localhost:5432/pomodoro'
const pool = new Pool({
  connectionString: connectionString,
})

app.use(cors());
app.use(bodyParser.json())


// for postgres, change this to actually read from the server
var tasks = [
    { id: 0, task_name: 'complete app', count: 0, breaks: 0, edit: false },
    { id: 1, task_name: 'finish backend', count: 0, breaks: 0, edit: false },
    { id: 2, task_name: 'add postgres', count: 0, breaks: 0, edit: false },
];

const createTasks = (req, res) => {
    const command = 'INSERT INTO task(id, task_name, count, breaks) VALUES(' + tasks.length+1 + ", \'" + req.body.task_name + "\'" + ', 0, 0)'
    pool.query(command, (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
}

const getTasks = (req, res) => {
    pool.query('SELECT * FROM task', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

const updateTask = (req, res) => {
    console.log(req.body.task_name)
    console.log(req.params.id)
    const command = 'UPDATE task SET task_name = \'' + req.body.task_name + '\' WHERE id = ' + req.params.id
    console.log(command)
    pool.query(command, (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
}

const deleteTask = (req, res) => {
    const command = 'DELETE FROM task WHERE id = ' + req.params.id
    pool.query(command, (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
}

app.route('/api/tasks').get(getTasks).post(createTasks)
app.route('/api/tasks/:id').put(updateTask).delete(deleteTask)

// Create tasks
// app.post('/api/tasks', (req, res) => {
//     tasks.push({
//         id: tasks.length + 1,
//         ...req.body, 
//     })
//     res.status(200).json(1)
// });

//update
app.put('/api/tasks/:id', (req, res) => {
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