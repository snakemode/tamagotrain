const express = require("express");
const app = express();


app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/api/ably-key", (request, response) => {  
  response.json({ value: process.env.ABLY_API_KEY });
  
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
