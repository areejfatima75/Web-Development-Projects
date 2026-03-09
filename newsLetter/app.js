const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signUp.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = 'https://us20.api.mailchimp.com/3.0/lists/71872483a7';
  const options = {
    method: "POST",
    auth : "areej:ac1c8b2343240262c0e72bc22fedc7b88-us20",
  };


  const request = https.request(url, options, (response)=> {

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failuer.html");
    }

    // response.on("data", (data) => {
    //   console.log(JSON.parse(data));
    // });
  })
    request.write(jsonData);
    request.end();
});

app.post("/failuer", (req, res) => {
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
