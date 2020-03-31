const uuidv4 = require("../utils").uuidv4;

class Problem {
  constructor(x, y) {
    this.id = uuidv4();
    this.ticks = 0;
    this.x = x;
    this.y = y;    
    console.log(this.constructor.name + "(id=" + this.id + ") ctor");
  }
}

module.exports = Problem;