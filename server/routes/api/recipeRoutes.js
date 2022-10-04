const router = require("express").Router();
const { ObjectId } = require("mongoose").Types;
const { Recipe } = require("../../models");

router.route("/").get((req, res) => {
	Recipe.find()
		.populate({
			path: "ingredients.source",
			select: "category"
		}).then(results => res.json(results));
});

router.route("/:id").get((req, res) => {
	Recipe.findById(req.params.id)
		.populate("ingredients")
		.then(result => res.json(result));
});

module.exports = router;