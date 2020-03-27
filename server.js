const express = require("express");
const app = express();
const ably = require('ably');

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/api/ably-key", (request, response) => {  
  
  const client = new ably.Realtime(process.env.ABLY_API_KEY);
  const result = client.auth.createTokenRequest({ clientId: 'bob' }, function(err, tokenRequest) {    
      if(err) {
        console.log('An error occurred; err = ' + err.message);
      } else {
        console.log('Success; token request = ' + tokenRequest);
      }
  });
  
  response.json(result);
  //response.json({ value: process.env.ABLY_API_KEY });
  
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

async function createTokenRequestPromise(client) {
  return new Promise((resolve, reject) => {  
    client.auth.createTokenRequest({ clientId: 'bob' }, function(err, tokenRequest) {    
        if (err) { reject(err); } else { resolve(tokenRequest); }
    });
  });
}