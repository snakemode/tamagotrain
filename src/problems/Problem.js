const uuidv4 = require("../utils").uuidv4;

class Problem {
  constructor(x, y) {
    console.log(this.constructor.name + "() ctor");
    this.id = uuidv4();
    this.ticks = 0;
    this.x = x;
    this.y = y;    
  }
}

module.exports = Problem;