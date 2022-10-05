const mongoose = require("mongoose");
const models = require("./models");
const database = require("./config/connection");

database.once("open", async () => {
	await models.Profile.deleteMany({});
	await models.Recipe.deleteMany({});
	await models.Ingredient.deleteMany({});
	Promise.all([
		models.Ingredient.create({
			name: "Tomato",
			category: "Plant"
		}),
		models.Ingredient.create({
			name: "Onion",
			category: "Plant"
		}),
		models.Ingredient.create({
			name: "Bell pepper",
			category: "Plant"
		}),
		models.Ingredient.create({
			name: "Processed cheese",
			category: "Dairy"
		}),
		models.Ingredient.create({
			name: "Noodle",
			category: "Grain"
		}),
		models.Ingredient.create({
			name: "Beef",
			category: "Meat"
		}),
	]).then(values => {
		Promise.all([
			models.Recipe.create({
				name: "Chili con Queso",
				story: [
					"This is a family recipe of unknown origin. The type of onion isn't super important; a mild variant for sensitive will still provide much-needed flavor. The cheese can be substituted with 16oz of Velveeta cheese, but the deli slices are easier to melt into the chili con queso. NEVER use Kraft Singles. Other cheese substitutes may require higher heat."
				],
				ingredients: [
					{
						name: "Diced Tomatoes",
						amount: "16oz",
						source: values[0]
					},
					{
						name: "Onion (white or Vidalia)",
						amount: "1",
						source: values[1]
					},
					{
						name: "Green bell pepper",
						amount: "1",
						source: values[2]
					},
					{
						name: "Kraft Deli Deluxe Slices",
						amount: "24",
						source: values[3]
					}
				],
				steps: [
					"Dice onion and bell pepper.",
					"Place onion and bell pepper in saucepan on medium heat for ten minutes.",
					"Add tomato (do not drain) and let cook for an additional minute.",
					"Reduce heat to low and mix-in cheese in torn pieces a slice or two at a time.",
					"Mix thoroughly by hand until sauce thickens, 2-5 minutes.",
					"Serve with corn chips (Fritos recommended) or in a tortilla."
				]
			}),
			models.Recipe.create({
				name: "Hagar Spaghetti",
				story: [
					"This is a family recipe from the Great Depression. It was concocted from cheap ingredients of the time, and what goes into it is flexible. The taste is similar to Hamburger Helper.",
					"Although called \"spaghetti\", this recipe does not make use of pasta sauce. Instead, the processed cheese instead acts as the sauce coating everything. Also why the Velveeta should NOT be substituted with anything else. The 30 minute window at the end is a good time to ready a side dish."
				],
				ingredients: [
					{
						name: "Spaghetti",
						amount: "16oz",
						source: values[4]
					},
					{
						name: "Ground Beef",
						amount: "16oz",
						source: values[5]
					},
					{
						name: "Diced Tomatoes",
						amount: "16oz",
						source: values[0]
					},
					{
						name: "Onion (Vidalia preferred)",
						amount: "1",
						source: values[1]
					},
					{
						name: "Green Bell Pepper",
						amount: "1",
						source: values[2]
					}
				],
				steps: [
					"Dice onion and green bell pepper.",
					"Brown ground beef in skillet on medium high heat. Drain.",
					"Add onion, bell pepper, and tomato to beef. Continue to cook for ten minutes on medium heat.",
					"In another pot, bring water to a boil and cook spaghetti noodles until al dente.",
					"Drain noodles and lower heat to low. Mix the contents of the skillet into it.",
					"Mix the Velveeta cheese into the pot.",
					"Once cheese is melted, cover and let cook on low for 30 minutes."
				]
			})
		]).then(values => {
			models.Profile.create({
				name: "Axel",
				email: "axeljkern@gmail.com",
				recipes: [
					values[0],
					values[1]
				]
			}).then(results => database.close());
		});
	});
});