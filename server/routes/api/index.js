const router = require("express").Router();
const recipeRoutes = require("./recipeRoutes");
const profileRoutes = require("./profileRoutes");

router.use("/recipes", recipeRoutes);
router.use("/profiles", profileRoutes);

module.exports = router;