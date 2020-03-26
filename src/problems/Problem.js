const uuidv4 = require("../utils").uuidv

class Problem {
  constructor(x, y) {
    this.id = uuidv4();
    this.ticks = 0;
    this.x = x;
    this.y = y;    
  }
}

module.exports = Problem;