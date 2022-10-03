const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
	{
		name: String,
		email: String,
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