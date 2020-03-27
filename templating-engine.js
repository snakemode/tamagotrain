const { promisify } = require('util');
const fs = require("fs");
const readFileAsync = promisify(fs.readFile);

class TemplatingEngine {
  constructor() {    
  }
  
  async render(viewName, data) {
    data = data || { };
    
    const templateFile = await readFileAsync(__dirname + `/views/${viewName}.html`);
    
    let templated = templateFile.toString();
    const props = Object.getOwnPropertyNames(data);
    
    for (let prop of props) {
      const value = data[prop];
      const valueAsString = JSON.stringify(value);
      
      templated = templated.replace('@Model.' + prop, valueAsString);
      templated = templated.replace('@Model.(' + prop + ')', valueAsString);
    }
    
    return templated;    
  }
}

module.exports = TemplatingEngine;