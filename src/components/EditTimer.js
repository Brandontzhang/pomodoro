import React from 'react'
import { connect } from 'react-redux'
import Popup from 'reactjs-popup'
import styles from '../styles/settings.module.css' 

class EditTimer extends React.Component {

    componentDidMount() {
        this.setState({
            newPomoTime: this.props.pomodoroTime,
            newBreakTime: this.props.breakTime
        })
    }

    state = {
        newPomoTime: "",
        newBreakTime: "",
    }

    render() {
        return (
            <Popup className={styles.popup} trigger={<button className={styles.timerButton}>Settings</button>} modal>
                <div className={styles.settings}>
                    <h1>Timer Settings</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <span>Pomodoro Time:</span>
                            </div>
                            <div className="col-9">
                                <input onChange={(e) => this.setState({ newPomoTime: e.target.value })} placeholder={this.props.pomodoroTime} value={this.state.newPomoTime} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <span>Break Time:</span>
                            </div>
                            <div className="col-9">
                                {console.log(this.state.newBreakTime)}
                                <input onChange={(e) => this.setState({ newBreakTime: e.target.value })} placeholder={this.props.breakTime} value={this.state.newBreakTime} />
                            </div>
                        </div>
                        <div>
                            <button className={styles.timerButton + " " + styles.saveButton} onClick={() => {this.props.updateSettings(this.state.newPomoTime, this.state.newBreakTime)}}>Save</button>
                        </div>
                    </div>
                </div>
            </Popup>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pomodoroTime: state.timerStore.baseTime,
        breakTime: state.timerStore.baseBreak
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSettings: (pomoTime, breakTime) => {
            dispatch({
                type: "UPDATE_SETTINGS",
                pomo: pomoTime,
                break: breakTime
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTimer)