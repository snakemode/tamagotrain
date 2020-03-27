const { promisify } = require('util');
const express = require("express");
const fs = require("fs");
const readFileAsync = promisify(fs.readFile);
const TemplatingEngine = require("./templating-engine.js");
const ably = require('ably');

const client = new ably.Realtime(process.env.ABLY_API_KEY);
const render = new TemplatingEngine();

const app = express();
app.use(express.static("public"));

app.get("/", async (request, response) => {
  const tokenRequestData = await createTokenRequest();  
  const templateFile = await readFileAsync(__dirname + "/views/index.html");
  const templated = templateFile.toString().replace('"{ createTokenRequest }"', JSON.stringify(tokenRequestData));  
  response.set('Content-Type', 'text/html');
  response.send(templated);
});

app.get("/api/createTokenRequest", async (request, response) => {
  const tokenRequestData = await createTokenRequest();
  response.send(tokenRequestData);
});

async function createTokenRequest(request) {
  request = request || { clientId: 'trainagotchi' };
  return new Promise((resolve, reject) => {  
    client.auth.createTokenRequest(request, function(err, tokenRequest) {    
        if (err) { reject(err); } else { resolve(tokenRequest); }
    });
  });
}

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});