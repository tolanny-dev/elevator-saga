{
    init: function(elevators, floors) {
    var myLog = function(text, elevator){
        var hasElevator = elevator !== undefined;
        if(hasElevator){
            text = "["+elevator+"]: " + text;
        }
        console.log(text);
    }

    
    elevators.forEach(function(current, index){
        current.on("floor_button_pressed", function(floorNum) { 
            console.log("floor_button_pressed: " + floorNum );
            current.goToFloor(floorNum);
            if(current.currentFloor() > floorNum){
                elevatorsDirection[index] = "down";
            } else {
                elevatorsDirection[index] = "up";
            }
        });
        current.on("passing_floor", function(floorNum, direction) { 
            myLog("passing_floor: " + floorNum + ", " + direction+", load: "+ current.loadFactor(), index);
            elevators.forEach(function(current, index){
                var loadFactorBefore = current.loadFactor();
                if(loadFactorBefore < 0.8){
                    if(direction === "up" && waitingAbove[floorNum] > 0){
                        myLog("entered mid lift - up", index);
                        if(current.loadFactor() > loadFactorBefore){
                            current.goToFloor(floorNum, true);
                            waitingAbove[floorNum]--;
                        }
                    }
                    if(direction === "down" && waitingBelow[floorNum] > 0){
                        myLog("entered mid lift - down", index);
                        if(current.loadFactor() > loadFactorBefore){
                            current.goToFloor(floorNum, true);
                            waitingBelow[floorNum]--;
                        }
                    }
                }
            });
        });
        current.on("idle", function(floorNum) { current.goToFloor(0); } );
    });

    var waitingAbove= [];
    var waitingBelow= [];
    var elevatorsDirection = [];
    floors.forEach(function(_,index){
        waitingAbove.push(0);
        waitingBelow.push(0);
        elevatorsDirection.push("stop");
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
