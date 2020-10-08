let myTodos = {
    day: 'Monday',
    meetings: 0,
    meetDone: 0,

    addMeeting: function(meetings) {
        this.meetings = this.meetings + meetings;
    },

    meetingsDone: function(meetings) {
        this.meetDone = this.meetDone + meetings;
    },

    summary: function() {
        return {
            total: `You have ${this.meetings} meetings today!`,
            done: `You have ${this.meetDone} meetings done today!`,
        };
    },

    reset: function() {
        this.meetDone = 0;
        this.meetings = 0;
    }

};

myTodos.addMeeting(4);
myTodos.meetingsDone(2);

console.log(myTodos.summary());
myTodos.reset();
console.log(myTodos.summary());
// Assignment
// Handle meeting done
// Create a fn that can reset entire day
