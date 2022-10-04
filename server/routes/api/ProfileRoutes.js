const router = require("express").Router();
const { ObjectId } = require("mongoose").Types;
const { Profile, Recipe } = require("../../models");

router.route("/").get((req, res) => {
	Profile.find()
		.populate({
			path: "recipes",
			select: "name"
		}).then(result => res.json(result));
});

router.route("/:id").get((req, res) => {
	Profile.findById(req.params.id)
		.populate({
			path: "recipes",
			select: "name"
		}).then(result => res.json(result));
});

module.exports = router;