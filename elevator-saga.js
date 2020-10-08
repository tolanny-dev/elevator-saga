{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator
        
        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() {
            // let's go to all the floors (or did we forget one?
            elevator.goToFloor(0);
            if(elevator.goingUpIndicator()) {
                elevator.destinationQueue.push(1);
                elevator.checkDestinationQueue();
            } else if(elevator.goingUpIndicator()) {
                elevator.destinationQueue.push(2);
                elevator.checkDestinationQueue();
            }
        });
        elevator.on("floor_button_pressed", function(floor) {
            elevator.destinationQueue.push(floor);
            elevator.checkDestinationQueue();
            if (!elevator.destinationQueue.includes(floor)) {
                elevator.destinationQueue.push(floor);
                elevator.checkDestinationQueue();
            }
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
