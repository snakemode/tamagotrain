const express = require("express");
const fs = require("fs");
const { promisify } = require('util');

const ably = require('ably');
const client = new ably.Realtime(process.env.ABLY_API_KEY);

const readFileAsync = promisify(fs.readFile);
const createTokenRequestAsync = promisify(fs.readFile);

const app = express();


app.use(express.static("public"));

app.get("/", async (request, response) => {
  const tokenRequestData = await createTokenRequest({ clientId: 'trainagotchi' });  
  
  fs.readFile(__dirname + "/views/index.html", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  
  
  const fileC = await readFileAsync(__dirname + "/views/index.html");
  
  response.sendFile(__dirname + "/views/index.html");
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