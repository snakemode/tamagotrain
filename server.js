const { promisify } = require('util');
const express = require("express");
const fs = require("fs");
const readFileAsync = promisify(fs.readFile);

const ably = require('ably');
const client = new ably.Realtime(process.env.ABLY_API_KEY);


const app = express();


app.use(express.static("public"));

app.get("/", async (request, response) => {
  const tokenRequestData = await createTokenRequest({ clientId: 'trainagotchi' });  
  const templateFile = await readFileAsync(__dirname + "/views/index.html");
  
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/test", async (request, response) => {
  const tokenRequestData = await createTokenRequest({ clientId: 'trainagotchi' });  
  const templateFile = await readFileAsync(__dirname + "/views/index.html");
  let templated = templateFile;
  //const templated = templateFile.replace('"{ createTokenRequest }"', tokenRequestData);
  
  response.set('Content-Type', 'text/html');
  response.send(templated);
});

async function createTokenRequest(request) {
  return new Promise((resolve, reject) => {  
    client.auth.createTokenRequest(request, function(err, tokenRequest) {    
        if (err) { reject(err); } else { resolve(tokenRequest); }
    });
  });
}

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});