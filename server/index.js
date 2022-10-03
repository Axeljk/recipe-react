const express = require("express");
const database = require("./config/connection");
const routes = require("./routes");

const server = express();
const PORT = process.env.PORT || 3001;
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(routes);

database.once("open", () => {
	server.listen(PORT, () => {
		console.log(`Server running on port ${PORT}.`);
	});
});