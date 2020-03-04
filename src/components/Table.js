import React from 'react'
import { connect } from 'react-redux'
import styles from '../styles/table.module.css';
import { fetchTable, createTask, deleteTask, updateTask } from '../services/timerServices';

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.props.init()
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
                                <th>Pomodoro</th>
                                <th>Breaks</th>
                                <th></th>
                            </tr>
                            {this.props.table.map((item, index) =>
                                <tr
                                    key={item.id}
                                >
                                    <td
                                        className={(item.task === this.props.currentTask) ? styles.active : null}>
                                        {(item.edit) ?
                                            <input id={styles.editTask} onKeyPress={(e) => {
                                                if (e.which === 13 && e.target.value !== "") {
                                                    this.props.updateTask(e.target.value, item.id)
                                                    e.target.value = ""
                                                    this.props.editTask(item.id)
                                                }
                                            }}/> :
                                            <span onClick={() => this.props.selectTask(item.task)}>{item.task}</span>
                                        }
                                    </td>
                                    <td>{item.count}</td>
                                    <td>{item.breaks}</td>
                                    <td>
                                        <i
                                            onClick={() => this.props.editTask(item.id)}
                                            className="fa fas fa-pen">
                                        </i>
                                        <i
                                            onClick={() => this.props.deleteTask(item.id)}
                                            className="fa fas fa-times">
                                        </i>
                                    </td>
                                </tr>
                            )}
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
        currentTask: state.timerStore.currentTask
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            fetchTable().then(table => {
                dispatch({
                    type: "INITIALIZE_TABLE",
                    table: table
                })
            })
        },

        createTask: (newTask) => {
            createTask(newTask).then(() => dispatch({
                type: "CREATE_TASK",
                task: newTask
            }))
        },

        selectTask: (selectTask) => {
            dispatch({
                type: "SELECT_TASK",
                task: selectTask
            })
        },

        editTask: (id) => {
            dispatch({
                type: "EDIT_TASK",
                id: id
            })
        },

        updateTask: (newTask, id) => {
            updateTask(newTask, id).then(() => dispatch({
                type: "UPDATE_TASK",
                task: newTask,
                id: id
            }))
        },

        deleteTask: (id) => {
            deleteTask(id).then(() => dispatch({
                type: "DELETE_TASK",
                id: id
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)