# V1: Timer and Tracker #
* Make it pretty! 
- [x] table min and max width
* Have a adjustable timer with a table
- [x] make table items editable and deletable

# V2: Add the backend -> Calendar #
Probably gonna look into some kind of sql (postgres?) or mongodb, add a calendar to track multiple sessions/days  
- [ ] implement cookies through react, forget about back end for now. Might not even need it for the version I'm currently thinking of  
which could work like how the animal crossing thing did
- [ ] track the sessions over dates
- [ ] make table items editable and deletable
- [ ] use google calendar api?

# Current Goals: #
- [ ] make site work with cookies
- [ ] add sound

# Extra #
* look into how the time input and browser notification were made
    * get rid of hours/minutes when not using? (probably requires creating own component, looking into how to use typescript)
    * togle between pomodoros and actual time spent

# Pretty goals: #
- [ ] make side pop out for table and calendar
- [ ] table min and max width, table columns fixed lengths...  
- [ ] wavy background :D

# Issues to look into: # 
* Temp fix with UUID delete (this.props.init to refresh the table on frontend before communicating with backend?)
