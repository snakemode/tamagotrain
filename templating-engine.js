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
      templated = templateFile.replace('{ " + prop + " }', JSON.stringify(value));
    }
    
    return templated;
    
    //const templated = templateFile.toString().replace('"{ createTokenRequest }"', JSON.stringify(tokenRequestData));  
  }
}

module.exports = TemplatingEngine;