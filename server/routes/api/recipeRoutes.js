const router = require("express").Router();
const { ObjectId } = require("mongoose").Types;

router.route("/").get((req, res) => {
	res.json({ message: "lol" });
});

module.exports = router;