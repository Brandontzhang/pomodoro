import React from 'react'
import ReactNotifications from 'react-browser-notifications'
import TimeField from 'react-simple-timefield'
import { connect } from "react-redux"
import styles from '../styles/timer.module.css'
import Table from './Table'
import EditTimer from './EditTimer'

class Timer extends React.Component {
    constructor() {
        super();
        this.onTimeChange = this.onTimeChange.bind(this);
    }

    componentDidMount() {
        document.title = this.props.time
    }

    componentDidUpdate() {
        document.title = this.props.time
        if (this.props.tick === true) {
            this.props.clearCounter();
            this.props.addCounter(setInterval(this.updateTimer, 1000))
        } else {
            this.props.clearCounter();
        }
    }

    // function for time input
    onTimeChange(event, value) {
        const newTime = value.replace(/-/g, ':');
        const time = newTime.padEnd(8, this.props.time.substr(5, 3));

        this.props.updateBaseTime(value);

        this.props.tickTime(time)
    }

    // function for alerts
    showNotifications = () => {
        if (this.n.supported()) this.n.show();
    }

    // handle click for alerts
    handleClick = (event) => {
        // Do something here such as
        // console.log("Notification Clicked") OR
        // window.focus() OR
        // window.open("http://www.google.com")

        // Lastly, Close the notification
        this.n.close(event.target.tag);
    }

    // handles how the state is updated for the time
    updateTimer = () => {
        var sec = this.props.time.slice(-2)
        var min = this.props.time.slice(3, -3)
        var hour = this.props.time.slice(0, 2)
        var time

        if (hour === "00" && min === "00" && sec === "00") {
            // end point reached, send notification and stop the timer
            this.showNotifications()
            clearInterval(this.props.counter)
            this.props.updateTick(this.props.tick, this.props.time, this.props.currentTask)
            this.props.timerComplete(this.props.currentTask)
            return;
        }

        if (sec > 0) {
            sec = sec - 1;
            (sec < 10) ? time = hour + ":" + min + ":0" + sec : time = hour + ":" + min + ":" + sec;
        } else if (sec === "00" && min !== "00") {
            min = min - 1;
            sec = 59;
            (min < 10) ? time = hour + ":0" + min + ":" + sec : time = hour + ":" + min + ":" + sec;
        } else if (hour !== "00" && min === "00" && sec === "00") {
            hour = hour - 1;
            min = 59;
            sec = 59;
            (hour < 10) ? time = "0" + hour + ":" + min + ":" + sec : time = hour + ":" + min + ":" + sec;
        }
        this.props.tickTime(time)
    }

    render() {
        const { time, tick, currentTask } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className={"col-md-12 col-lg-7 " + styles.timerContainer}>
                        <div className={styles.container}>
                            <h2 className={styles.currentTask}>
                                {this.props.work && !currentTask && <div>Select something to work on!</div>}
                                {this.props.work && currentTask && <div>Currently Working On: {currentTask}</div>}
                                {!this.props.work && <div>Taking a short break</div>}
                            </h2>
                            <section>
                                <TimeField
                                    showSeconds
                                    value={time}
                                    onChange={this.onTimeChange}
                                    style={{
                                        border: '2px solid #ADD8E6',
                                        fontSize: 110,
                                        width: '100%',
                                        padding: '5px 8px',
                                        color: '#05445E',
                                        borderRadius: '5px',
                                        textAlign: 'center',
                                        boxShadow: '0 0 20px rgba(0,0,0,0.15)',
                                        backgroundColor: 'white',
                                    }}
                                    className={styles.timerInput}
                                />
                            </section>
                            <section>
                                <button
                                    onClick={() => { this.props.setTime(this.props.baseTime, true) }}
                                    className={styles.timerButton}>
                                    Reset
                                    </button>
                                <button
                                    onClick={() => { this.props.setTime(this.props.baseBreak, false) }}
                                    className={styles.timerButton}>
                                    Break
                                    </button>
                                {time !== "00:00:00" && <button onClick={() => {
                                    if (currentTask || !this.props.work) {
                                        this.props.updateTick(tick, time, currentTask)
                                    }
                                }}
                                    className={styles.timerButton}>
                                    {tick ? "Stop" : "Start"}
                                </button>}
                                <EditTimer/>
                            </section>
                        </div>
                    </div>
                    <div className={"col-md-12 col-lg-5 " + styles.tableContainer}>
                        <Table />
                    </div>
                </div>
                <section>
                    <ReactNotifications
                        onRef={ref => (this.n = ref)} // Required
                        title="Time's Up!!" // Required
                        body={this.props.work ? "Check in to take a break?" : "Your break is over!"}
                        icon="icon.png"
                        timeout="5000"
                        onClick={event => this.handleClick(event)}
                    />
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        time: state.timerStore.time,
        tick: state.timerStore.tick,
        baseTime: state.timerStore.baseTime,
        baseBreak: state.timerStore.baseBreak,
        currentTask: state.timerStore.currentTask,
        work: state.timerStore.work,
        table: state.timerStore.table
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            dispatch({
                type: "INITIALIZE",
            })
        },

        addCounter: (counter) => {
            dispatch({
                type: "UPDATE_COUNTER",
                counter: counter,
            })
        },

        clearCounter: () => {
            dispatch({
                type: "CLEAR_COUNTER"
            })
        },

        updateTick: (tick, time, task) => {
            dispatch({
                type: "CHANGE_TICK",
                tick: tick,
                time: time,
                task: task,
            })
        },

        setTime: (newTime, work) => {
            dispatch({
                type: "SET_TIME",
                time: newTime,
                work: work
            })
        },

        tickTime: (newTime) => {
            dispatch({
                type: "TICK_TIME",
                time: newTime
            })
        },

        timerComplete: (curTask) => {
            dispatch({
                type: "TIMER_COMPLETE",
                task: curTask
            })
        },

        updateBaseTime: (time) => {
            dispatch({
                type: "UPDATE_BASE_TIME",
                time: time
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)