const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name of ingredient missing."]
		},
		category: {
			type: String,
			required: [true, "Ingredient category required."]
		}
	},
	{
		toJSON: {
			virtuals: true
		},
		id: false
	}
);

module.exports = model("Ingredient", ingredientSchema);