var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Fish extends LiveForm {
    constructor(x, y) {
        super(x, y);
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
    move() {

        let emptyCells = this.chooseCell(4);
        let newCell = random(emptyCells);

        if (newCell) {
           
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 4;

            this.y = y;
            this.x = x;

        }
    }
}