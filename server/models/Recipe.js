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
		story: String,
		ingredients: [
			{
				type: Schema.Types.ObjectId,
				ref: "Ingredient"
			}
		],
		steps: [String]
	},
	{
		toJSON: {
			virtuals: true
		},
		id: false
	}
);

module.exports = model("Recipe", recipeSchema);