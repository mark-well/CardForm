const {exec} = require("child_process")
const express = require("express");
const bodyParser = require("body-parser");
const Datastore = require("nedb");
const databaseHandler = require("./databaseHandler.js");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

//MiddleWare
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
	origin: '*',
}));

//Load database
let database = new Datastore("database.db");
database.loadDatabase();

app.get("/", (req, res) => {
	//res.send(__dirname + "/cardSuccess.html");
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Add new card
app.post("/addNewCard", (req, res) => {
	let data = req.body;
	
	//Add the new data to the database
	databaseHandler.addNewDataToDatabase(data, database);
	
	console.log("\nNew card added");
	console.log(JSON.stringify(data) + "\n");
	//exec("termux-vibrate -f -d 500");
	exec(`termux-notification --title "New card was added"`);
	res.redirect("/cardSuccess.html");
});

app.listen(PORT, ()=> {
	console.log(`Server running on port ${PORT}`);
});