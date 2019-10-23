let count =true
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Fish = require("./modules/Fish.js");
var Water = require("./modules/Water.js");
var Amenaker= require("./modules/Amenaker.js");
let random = require('./modules/random');
//! Requiring modules  --  END

amenakerArr= [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
waterArr = [];
fishArr = [];
matrix = [];


// statistics start
amenakerhashiv = 0 ;
grassHashiv = 0;
eatHashiv = 0;
huntHashiv = 0;
waterHashiv = 0;
fishHashiv = 0;
// statistics end

// time = 0
//! Creating MATRIX -- START

function matrixGenerator(matrixSize, amenaker,grass, eat, hunt, water, fish) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0 - 39
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < eat; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < hunt; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fish; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < amenaker; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(40,5 ,20, 15, 10, 1);
//! Creating MATRIX -- END

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eat = new GrassEater(x, y);
                grassEaterArr.push(eat);
                eatHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++
            }
            else if (matrix[y][x] == 3) {
                var hunt = new Predator(x, y);
                predatorArr.push(hunt);
                huntHashiv++
            }
            else if (matrix[y][x] == 4) {
                var water = new Water(x, y);
                waterArr.push(water);
                waterHashiv++
            }
            else if (matrix[y][x] == 5) {
                var fish = new Fish(x, y);
                fishArr.push(fish);
                fishHashiv++
            }
            else if (matrix[y][x] == 6) {
                var amenaker = new Amenaker(x, y);
                amenakerArr.push(amenaker);
                amenakerhashiv++
            }
        }
    }

}

creatingObjects();
let exanak = 0
function game() {
    exanak++;
    if (exanak <= 10){
        weather = "գարուն"
    }
    else if (exanak <= 20){
        weather = "ամառ"
    }
    else if (exanak <= 30){
        weather = "աշուն"
    }
    else if (exanak <= 40){
        weather = "ձմեռ"
    }
    else if (exanak = 50)
    {
        exanak = 0
    }


    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {


            if(weather == "գարուն"){
                grassArr[i].mul();
            }
            else if (weather == "ամառ"){
                grassArr[i].mul();
            }
            else if (weather == "աշուն"){
                grassArr[i].mul();
            }
            else if (weather == "ձմեռ"){
                
            }
            
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {

            if(weather == "գարուն"){
                waterArr[i].mul();
            }
            else if (weather == "ամառ"){
                waterArr[i].mul();
            }
            else if (weather == "աշուն"){
                waterArr[i].mul();
            }
            else if (weather == "ձմեռ"){
                
            }
            
            
            if (waterArr.length == 50 && count ) {
                count =false
                let curr = random(waterArr);
                for (var l = 0; l < 5; l++) {
                    matrix[curr.y][curr.x] = 5;
                    let fish = new Fish(curr.x, curr.y);
                    fishArr.push(fish) 
                      fishHashiv++;
                }
    
                for (let i in waterArr) {
                 
                    if (waterArr[i].x == curr.x && waterArr[i].y == curr.y) {
                        waterArr.splice(i, 1)
                    }
                }
                 
            }
        }
    }
    if (fishArr[0] !== undefined) {
        for (var i in fishArr) {
            fishArr[i].move();
        }
    }
    if (amenakerArr[0] !== undefined) {
        for (var i in amenakerArr) {
            amenakerArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        amenakerCounter:amenakerhashiv,
        amenakerLiveCounter:amenakerArr.length,
        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,
        eatCounter: eatHashiv,
        eatLiveCounter: grassEaterArr.length,
        huntCounter: huntHashiv,
        huntLiveCounter: predatorArr.length,
        waterCounter: waterHashiv,
        waterLiveCounter: waterArr.length,
        fishCounter: fishHashiv,
        fishLiveCounter: fishArr.length,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 200)