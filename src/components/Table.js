import React from 'react'
import { connect } from 'react-redux'
import styles from '../styles/table.module.css';

// alter this to use localStorage

class Table extends React.Component {
    componentDidMount() {
        this.props.fetchTasks()
    }

    render() {
        return (
            <div>
                <div>
                    {/* <col width="300" />
                    <col width="120" />
                    <col width="120" /> */}
                    <table className={styles.taskTable}>
                        <tbody>
                            <tr key="header">
                                <th>Task</th>
                                <th>Pomodoro Sessions</th>
                                <th>Total Time</th>
                                <th></th>
                            </tr>
                            {this.props.table.map((item) =>
                                <tr key={item.id}>
                                    <td
                                        className={(item.task === this.props.currentTask) ? styles.active : null}>
                                        {(item.edit) ?
                                            <input id={styles.editTask} onKeyPress={(e) => {
                                                if (e.which === 13 && e.target.value !== "") {
                                                    this.props.updateTask(e.target.value, item.id)
                                                    e.target.value = ""
                                                }
                                            }} /> :
                                            <span onClick={() => this.props.selectTask(item.task)}>{item.task}</span>
                                        }
                                    </td>
                                    <td>{item.count}</td>
                                    <td>{item.totalTime}</td>
                                    <td>
                                        <i
                                            onClick={() => this.props.editTask(item.id)}
                                            className="fa fas fa-pen">
                                        </i>
                                        <i
                                            onClick={() => {this.props.deleteTask(item.id)}}
                                            className="fa fas fa-times">
                                        </i>
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td>
                                    Breaks
                                </td>
                                <td>
                                    {this.props.breaks}
                                </td>
                                <td>
                                    {this.props.breakTime}
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan="4">
                                    <input onKeyPress={(e) => {
                                        if (e.which === 13 && e.target.value !== "") {
                                            this.props.createTask(e.target.value)
                                            e.target.value = ""
                                        }
                                    }} type="text" placeholder="Add New Task" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div >
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        table: state.timerStore.table,
        currentTask: state.timerStore.currentTask,
        breaks: state.timerStore.breaks,
        breakTime: state.timerStore.breakTime
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTasks: () => {
            dispatch({
                type: "FETCH_TASKS", 
            })
        }, 

        createTask: (newName) => {
            dispatch({
                type: "CREATE_TASK",
                task: newName
            })
        },

        editTask: (id) => {
            dispatch({
                type: "EDIT_TASK", 
                id: id
            })
        },

        updateTask: (name, id) => {
            dispatch({
                type: "UPDATE_TASK", 
                name: name,
                id: id
            })
        },

        deleteTask: (id) =>{
            dispatch({
                type: "DELETE_TASK", 
                id: id
            })
        },

        selectTask: (selectTask) => {
            dispatch({
                type: "SELECT_TASK",
                task: selectTask
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)