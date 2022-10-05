const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
	{
		name: {
			type: String,
			minLength: [4, "Recipe name too short."],
			maxLength: [128, "Recipe name too long."],
			unique: true,
			required: [true, "Recipe name missing."]
		},
		story: [String],
		ingredients: [{
			name: {
				type: String,
				maxLength: [32, "Ingredient name too long."]
			},
			amount: {
				type: String,
				maxLength: [16, "Ingredient amount too long."],
				required: [true, "Amount of ingredient missing."]
			},
			source: {
				type: Schema.Types.ObjectId,
				ref: "Ingredient",
				required: [true, "Source of ingredient required."]
			}
		}],
		steps: [{
			type: String,
			maxLength: [128, "Instructional step is too long."],
			required: [true, "Steps to make recipe missing."]
		}]
	},
	{
		toJSON: {
			virtuals: true
		},
		id: false
	}
);

recipeSchema.pre("findOne", function(next) {
	this.populate("ingredients.source");
	next();
});
recipeSchema.virtual("contains").get(function() {
	if (this.ingredients === undefined)
		return

	let categories = this.ingredients.map(e => e.source.category);
	categories = [...new Set(categories)];
	if (categories.indexOf("Plant") !== -1)
		categories.splice(categories.indexOf("Plant"), 1);
	if (categories.indexOf("Meat") === -1) {
		categories.push("Vegetarian");

		if (categories.indexOf("Fish") === -1 && categories.indexOf("Dairy") === -1)
			categories.push("Vegan");
	}
	return categories;
});

module.exports = model("Recipe", recipeSchema);