const initialState = {
    time: "00:25:00",
    tick: false,
    work: false,
    baseTime: "00:25:00",
    baseBreak: "00:05:00",
    table: [],
    currentTask: "",
    breaks: 0,
    breakTime: "00:00:00",
    addTime: "00:25:00"
}

export const TimerReducer = (state = initialState, action) => {
    const addTimes = (t1, t2) => {
        var sec1 = parseInt(t1.slice(-2))
        var min1 = parseInt(t1.slice(3, -3))
        var hour1 = parseInt(t1.slice(0, 2))

        var sec2 = parseInt(t2.slice(-2))
        var min2 = parseInt(t2.slice(3, -3))
        var hour2 = parseInt(t2.slice(0, 2))

        var sec, min
        if (sec1 + sec2 > 59) {
            sec = (sec1 + sec2) - 60
            min1 += 1
        } else {
            sec = (sec1 + sec2)
        }

        if (min1 + min2 > 59) {
            min = (min1 + min2) - 60
            hour1 += 1
        } else {
            min = (min1 + min2)
        }
        var hour = hour1 + hour2
        if (min < 10) min = "0" + min
        if (sec < 10) sec = "0" + sec
        if (hour < 10) hour = "0" + hour

        return hour + ":" + min + ":" + sec
    }

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
                work: action.work,
                addTime: state.baseTime
            }

        case "FETCH_TASKS": {
            if (localStorage.getItem('tasks')) {
                return {
                    ...state,
                    table: JSON.parse(localStorage.getItem('tasks')).map(task => ({ ...task, edit: false })),
                    breaks: (localStorage.getItem('breaks')) ? JSON.parse(localStorage.getItem('breaks')) : state.breaks,
                    breakTime: (localStorage.getItem('breakTime')) ? JSON.parse(localStorage.getItem('breakTime')) : state.breakTime
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
            newTable.push({ id: id, task: action.task, count: 0, totalTime: "00:00:00", edit: false })
            localStorage.setItem('tasks', JSON.stringify(newTable))
            return {
                ...state,
                table: newTable
            }
        }

        case "TIMER_COMPLETE": {
            if (state.work) {
                const newTable = state.table.map(task => {
                    if (task.task === action.task) {
                        return {
                            ...task,
                            count: task.count + 1,
                            totalTime: addTimes(task.totalTime, state.addTime)
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
            } else {
                localStorage.setItem('breaks', JSON.stringify(state.breaks + 1))
                localStorage.setItem('breakTime', JSON.stringify(addTimes(state.breakTime, state.addTime)))
                return {
                    ...state,
                    breaks: state.breaks + 1,
                    breakTime: addTimes(state.breakTime, state.addTime)
                }
            }
        }

        case "SELECT_TASK":
            return {
                ...state,
                currentTask: action.task,
                work: true
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

        case "UPDATE_BASE_TIME": {
            return {
                ...state,
                addTime: action.time
            }
        }

        default:
            return state
    }
}