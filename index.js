const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser"); 
const { userRoute } = require("./user.js");          



const app = express();


app.use(bodyParser.json());

url =  "mongodb+srv://feydo:feyDo1234@node1.00lrnk3.mongodb.net/form?retryWrites=true&w=majority";

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});


userRoute(app);

app.listen(4000, () => {
  console.log("port running on port 4000");
});
