const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name of ingredient missing."]
		},
		quantity: {
			type: String,
			required: [true, "Amount of ingredient missing."]
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