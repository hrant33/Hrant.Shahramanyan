var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Amenaker extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 50;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        
        if (newCell) {
            amenakerhashiv++
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            let amenaker = new Amenaker(x, y);
            amenakerArr.push(amenaker);
            this.life = 50;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(2);
        let emptyCells1= this.chooseCell(1);
        let emptyCells2 = this.chooseCell(3);
        let newCell = random(emptyCells.concat(emptyCells1.concat(emptyCells2)));

        if (newCell) {
            this.life++;

            let x = newCell[0];
            let y = newCell[1];


            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;


            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;

            if (this.life >= 80) {
                this.mul();
            }
        } 
        else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let emptyCells1 = this.chooseCell(1);
        let newCell = random(emptyCells.concat(emptyCells1));

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {

            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in amenakerArr) {
            if (amenakerArr[i].x == this.x && amenakerArr[i].y == this.y) {
                amenakerArr.splice(i, 1)
            }
        }
    }
}