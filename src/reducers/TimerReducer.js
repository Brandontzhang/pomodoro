const initialState = {
    time: "00:25:00",
    tick: false,
    work: false,
    baseTime: "00:25:00",
    baseBreak: "00:05:00",
    table: [],
    currentTask: ""
}

export const TimerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_TICK":
            return {
                ...state,
                tick: !action.tick
            }

        case "UPDATE_COUNTER":
            return {
                ...state,
                counter: action.counter
            }

        case "CLEAR_COUNTER":
            clearInterval(state.counter)
            return state

        case "TICK_TIME":
            return {
                ...state,
                time: action.time
            }

        case "SET_TIME":
            return {
                ...state,
                time: action.time,
                tick: false,
                work: action.work
            }

        case "FETCH_TASKS": {
            if (localStorage.getItem('tasks')) {
                return {
                    ...state,
                    table: JSON.parse(localStorage.getItem('tasks')).map(task => ({ ...task, edit: false }))
                }
            } else {
                return {
                    ...state,
                    table: []
                }
            }
        }

        case "CREATE_TASK": {
            var id = 1;
            if (state.table[state.table.length - 1]) {
                id = state.table[state.table.length - 1].id + 1
            } else {
                id = 1
            }
            const newTable = [...state.table]
            newTable.push({ id: id, task: action.task, breaks: 0, count: 0, edit: false })
            localStorage.setItem('tasks', JSON.stringify(state.table))
            return {
                ...state,
                table: newTable
            }
        }

        case "TIMER_COMPLETE":
            return {
                ...state,
                table:
                    state.table.map(task => {
                        if (task.task === action.task) {
                            if (state.work) {
                                return {
                                    task: task.task,
                                    count: task.count,
                                    breaks: task.breaks + 1
                                }
                            } else {
                                return {
                                    task: task.task,
                                    count: task.count + 1,
                                    breaks: task.breaks
                                }
                            }
                        } else {
                            return task
                        }
                    })
            }

        case "SELECT_TASK":
            return {
                ...state,
                currentTask: action.task
            }

        case "EDIT_TASK": {
            return {
                ...state,
                table: state.table.map(task => {
                    if (task.id === action.id) {
                        return {
                            ...task,
                            edit: !task.edit
                        }
                    } else {
                        return task
                    }
                })
            }
        }

        case "UPDATE_TASK": {
            const newTable = state.table.map(task => {
                if (task.id === action.id) {
                    return {
                        ...task,
                        task: action.name,
                        edit: false,
                    }
                } else {
                    return task
                }
            })
            localStorage.setItem('tasks', JSON.stringify(newTable))
            return {
                ...state,
                table: newTable
            }
        }

        case "DELETE_TASK": {
            const newTable = state.table.filter(task => task.id !== action.id)
            localStorage.setItem('tasks', JSON.stringify(newTable))
            return {
                ...state,
                table: newTable
            }
        }

        default:
            return state
    }
}