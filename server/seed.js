const mongoose = require("mongoose");
const models = require("./models");
const database = require("./config/connection");

database.once("open", async () => {
	await models.Profile.deleteMany({});
	await models.Recipe.deleteMany({});
	await models.Ingredient.deleteMany({});
	Promise.all([
		models.Ingredient.create({
			name: "Diced Tomatoes",
			quantity: "16oz",
			category: "Vegetable"
		}),
		models.Ingredient.create({
			name: "Onion (white or Vidalia)",
			quantity: "1",
			category: "Vegetable"
		}),
		models.Ingredient.create({
			name: "Green bell pepper",
			quantity: "1",
			category: "Vegetable"
		}),
		models.Ingredient.create({
			name: "Kraft Deli Deluxe Slices",
			quantity: "24 slices (16oz)",
			category: "Dairy"
		}),
	]).then(values => {
		models.Recipe.create({
			name: "Chili con Queso",
			story: "This is a family recipe of unknown origin. The type of onion isn't super important; a mild variant for sensitive will still provide much-needed flavor. The cheese can be substituted with 16oz of Velveeta cheese, but the deli slices are easier to melt into the chili con queso. NEVER use Kraft Singles. Other cheese substitutes may require higher heat.",
			ingredients: [
				values[0],
				values[1],
				values[2],
				values[3]
			],
			steps: [
				"Dice onion and bell pepper.",
				"Place onion and bell pepper in saucepan on medium heat for ten minutes.",
				"Add tomato (do not drain) and let cook for an additional minute.",
				"Reduce heat to low and mix-in cheese in torn pieces a slice or two at a time.",
				"Mix thoroughly by hand until sauce thickens, 2-5 minutes.",
				"Serve with corn chips (Fritos recommended) or in a tortilla."
			]
		}).then(recipes => {
			models.Profile.create({
				name: "Axel",
				email: "axeljkern@gmail.com",
				recipes: [
					recipes[0]
				]
			}).then(results => database.close());
		});
	});
});