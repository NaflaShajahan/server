const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const socket = require("socket.io");
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Defining routes
const routes = {
  signup: require("./routes/signup"),
  login: require("./routes/login"),
  dashboard: require("./routes/dashboard")
};

//Establishing connection with database
const DB_URL = `mongodb+srv://DB:open@cluster0.h1ot9.mongodb.net/DB?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://DB:open@cluster0.h1ot9.mongodb.net/DB?retryWrites=true&w=majority", { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

//retrieving all data
app.use("/signup", routes.signup); 
app.use("/login",routes.login);
app.use("/dashboard", routes.dashboard.getAllridersdrivers);


const server = app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  
});

const io = socket(server);

io.on("connection", socket => {
  // Log whenever a user connects
  console.log("user connected");

  var markers = [
    {
      lat: 9.016822,
      lng: 76.856856,
      label: 'A',
      draggable: true
    },
    {
      lat: 9.0299,
      lng: 76.8649,
      label: 'A',
      draggable: true
    },
    {
      lat: 9.0927,
      lng: 76.8612,
      label: 'A',
      draggable: true
    },
  ]
  socket.emit('salutations', markers);

  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on("message", message => {
    console.log("Message Received: " + message);
    io.emit("message", { type: "new-message", text: message });
  });
});
