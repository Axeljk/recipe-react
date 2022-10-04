const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
	{
		name: {
			type: String,
			minLength: [2, "Name is too short."],
			maxLength: [32, "Name is too long."],
			required: [true, "A name is required."]
		},
		email: {
			type: String,
			unique: true,
			required: [true, "An email is required."]
		},
		image: String,
		recipes: [{
			type: Schema.Types.ObjectId,
			ref: "Recipe"
		}]
	},
	{
		toJSON: {
			virtuals: true
		},
		id: false
	}
);

module.exports = model("Profile", profileSchema);