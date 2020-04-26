//import { SERVER_URL } from "../constants";


// create
export const createTask = async (newTask) => {
    const response = await fetch(`http://localhost:5001/api/tasks`, {
        method: "POST",
        body: JSON.stringify({"task_name":newTask, "count": 0, "breaks": 0, edit: false}), 
        headers: {
            'Accept': 'application/json',
            "content-type": "application/json"
        }})
    return await response.json()
}

// read
export const fetchTable = async () => {
    const response = await fetch('http://localhost:5001/api/tasks')
    return await response.json()
}

//update
export const updateTask = async (newTask, id) => {
    const response = await fetch(`http://localhost:5001/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({"task_name":newTask}), 
        headers: {
            'Accept': 'application/json',
            "content-type": "application/json"
        }})
    return await response.json()
}

// delete
export const deleteTask = async (index) => {
    const response = await fetch(`http://localhost:5001/api/tasks/${index}`, {
        method: "DELETE"
    })
    return await response.json()
}