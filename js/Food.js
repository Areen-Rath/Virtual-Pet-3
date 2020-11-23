class Food{
    constructor(){
        this.foodStock = database.ref('Food');

        this.image = loadImage("images/Milk.png");
    }


    display(){
        var x = 80;
        var y = 150;

        push();
        imageMode(CENTER);
        if(fS > 0){
            image(this.image, 625, 250, 70, 70);
        }

        for(var i = 0; i < fS; i++){
            image(this.image, x, y, 50, 50);
            x = x + 30;
            if(i % 10 === 9){
                y = y + 50;
                x = 80;
            }
        }
        
        this.showTime();
        pop();
    }

    getFoodStock(){
        this.foodStock.on("value", function(data){
            fS = data.val();
        })
    }

    updateFoodStock(){
        database.ref('/').update({
            Food: fS
        })
    }

    deductFood(){
        if(fS <= 0){
            fS = 0;
        } else{
            fS -= 1;
        }
    }

    async getLastFed(){
        var response = await fetch("http://worldclockapi.com/api/json/est/now");
        var responseJSON = await response.json();
        var dt = responseJSON.currentDateTime;
        hour = dt.slice(11, 13);
        //console.log(hour);
    }

    showTime(){
        textSize(15);
        fill("white");
        if(hour > 12 && hour >= 1){
            text("Last Feed: " + hour % 12 + " PM", 50, 50);
        } else if(hour < 12){
            text("Last Feed: " + hour + " AM", 50, 50);
        } else if(hour === 12){
            text("Last Feed: 12 Noon", 50, 50);
        } else if(hour === 0){
            text("Last Feed: 12 Midnight");
        } else {
            text("Last Feed: Need to Start Feeding", 50, 50);
        }
    }

    async getCurrentTime(){
        var response = await fetch("http://worldclockapi.com/api/json/est/now");
        var responseJSON = await response.json();
        //var dt = responseJSON.currentDateTime;
        //currentHour = dt.slice(11, 13);
        currentHour = 10;
        //console.log(currentHour)
        return currentHour;
    }

    bedroom(){
        background(bedroom);
    }

    garden(){
        background(garden);
    }

    washroom(){
        background(washroom);
    }

}