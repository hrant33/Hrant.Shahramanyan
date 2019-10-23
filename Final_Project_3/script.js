let varkyan = 0;

function setup() {
    var socket = io();
    var side = 10;
    var matrix = [];
    
    //! Getting DOM objects (HTML elements)
    let weatherElement = document.getElementById('weather');
    let amenakerCountElement = document.getElementById('amenakerCount');
    let amenakerLiveCountElement = document.getElementById('amenakerLiveCount');
    let grassCountElement = document.getElementById('grassCount');
    let grassLiveCountElement = document.getElementById('grassLiveCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let grassEaterLiveCountElement = document.getElementById('grassEaterLiveCount');
    let huntCountElement = document.getElementById('huntCount');
    let huntLiveCountElement = document.getElementById('huntLiveCount');
    let waterCountElement = document.getElementById('waterCount');
    let waterLiveCountElement = document.getElementById('waterLiveCount');
    let fishCountElement = document.getElementById('fishCount');
    let fishLiveCountElement = document.getElementById('fishLiveCount');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);
    function plus() {
        varkyan++
    }
    setInterval(plus, 1000)
    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        weatherElement.innerText = data.weather;
        amenakerCountElement.innerText = data.amenakerCounter;
        amenakerLiveCountElement.innerText = data.amenakerLiveCounter;
        grassCountElement.innerText = data.grassCounter;
        grassLiveCountElement.innerText = data.grassLiveCounter;
        grassEaterCountElement.innerText = data.eatCounter;
        grassEaterLiveCountElement.innerText = data.eatLiveCounter;
        huntCountElement.innerText = data.huntCounter;
        huntLiveCountElement.innerText = data.huntLiveCounter;
        waterCountElement.innerText = data.waterCounter;
        waterLiveCountElement.innerText = data.waterLiveCounter;
        fishCountElement.innerText = data.fishCounter;
        fishLiveCountElement.innerText = data.fishLiveCounter;
        //! Every time it creates new Canvas with new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if(data.weather == "գարուն"){
                        fill("#bfd132");
                    }
                    else if (data.weather == "ամառ"){
                        fill("#009900");
                    }
                    else if (data.weather == "աշուն"){
                        fill("#b2c718 ");
                    }
                    else if (data.weather == "ձմեռ"){
                        fill("#c9ffa6 ");
                    }
                }                 
                else if (matrix[i][j] == 0) {
                    fill("#875c1c");
                } 
                else if (matrix[i][j] == 2) {
                    if(data.weather == "գարուն"){
                        fill("#f6f7f2");
                    }
                    else if (data.weather == "ամառ"){
                        fill("#D9DDDC");
                    }
                    else if (data.weather == "աշուն"){
                        fill("#dadbc5");
                    }
                    else if (data.weather == "ձմեռ"){
                        fill("#ccdbd8 ");
                    }
                } 
                else if (matrix[i][j] == 3) {
                    if(data.weather == "գարուն"){
                        fill("#0b45ba");
                    }
                    else if (data.weather == "ամառ"){
                        fill("#003399");
                    }
                    else if (data.weather == "աշուն"){
                        fill(" #042f85");
                    }
                    else if (data.weather == "ձմեռ"){
                        fill("#2b4270 ");
                    }
                } 
                else if (matrix[i][j] == 4) {
                    if(data.weather == "գարուն"){
                        fill("#00bbff");
                    }
                    else if (data.weather == "ամառ"){
                        fill("#00ccff");
                    }
                    else if (data.weather == "աշուն"){
                        fill("#009dd6 ");
                    }
                    else if (data.weather == "ձմեռ"){
                        fill("#73d2f5 ");
                    }
                } 
                else if (matrix[i][j] == 5) {
                    if(data.weather == "գարուն"){
                        fill("#f5d902");
                    }
                    else if (data.weather == "ամառ"){
                        fill("#ffcc00");
                    }
                    else if (data.weather == "աշուն"){
                        fill("#d9b00b ");
                    }
                    else if (data.weather == "ձմեռ"){
                        fill("#f5da6c");
                    }
                }
                else if (matrix[i][j] == 6) {
                    if(data.weather == "գարուն"){
                        fill("#ff8940");
                    }
                    else if (data.weather == "ամառ"){
                        fill("#ff6608");
                    }
                    else if (data.weather == "աշուն"){
                        fill("#ba5516 ");
                    }
                    else if (data.weather == "ձմեռ"){
                        fill("#e6925e");
                    }
                }
                rect(j * side, i * side, side, side);
            }
        }
    }
}