{
    init: function(elevators, floors) {
        // loop through both elevators
        elevators.forEach(function(current, index){
            // go to floor pressed
            current.on("floor_button_pressed", function(floorNum) { 
                current.goToFloor(floorNum);
            });
            current.on("passing_floor", function(floorNum, direction) { 
                if(current.loadFactor() < 0.8){
                    if(direction === "up" && waitingBelow[floorNum] > 0){
                        current.goToFloor(floorNum, true);
                        waitingBelow[floorNum]--;
                    }
                    if(direction === "down" && waitingAbove[floorNum] > 0){
                        current.goToFloor(floorNum, true);
                        waitingAbove[floorNum]--;
                    }
                }
            });
            current.on("idle", function(floorNum) { current.goToFloor(0); } );
        });
        
        var waitingAbove= [];
        var waitingBelow= [];
        floors.forEach(function(_,index){
            waitingAbove.push(0);
            waitingBelow.push(0);
        });
        
        floors.forEach(function(current, index){
            current.on("up_button_pressed", function() { waitingAbove[index]++; } );
            current.on("down_button_pressed", function() { waitingBelow[index]++; } );
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
