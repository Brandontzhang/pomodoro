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
        case "INITIALIZE": 
            return state
        case "INITIALIZE_TABLE": {
            return {
                ...state,
                table: action.table.map(t => {
                    return {
                        id: t.id,
                        task: t.task_name,
                        count: t.count,
                        breaks: t.breaks,
                        edit: false
                    }
                })
            }
        }
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

        case "CREATE_TASK": {
            return {
                ...state,
                table: [
                    ...state.table,
                    {
                        id: action.id,
                        task: action.task,
                        count: 0, 
                        breaks: 0
                    }
                ]
            }}

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
        
        case "DELETE_TASK": {
            return {
                ...state,
                table: state.table.filter(task => task.id !== action.id) 
            }
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
            return {
                ...state,
                table: state.table.map(task => {
                    if (task.id === action.id) {
                        return {
                            ...task,
                            task: action.task
                        }
                    } else {
                        return task
                    }
                }) 
            }
        }
        
        default:
            return state
    }
}