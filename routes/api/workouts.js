const router = require("express").Router();
const workoutController = require("../../controllers/workoutController");

// Matches with "/api/workouts"
router.route("/")
  .get(workoutController.findAll)
  
  // Matches with "/api/workouts/:id"
  router
  .route("/:id")
  .get(workoutController.findById)
  .post(workoutController.create)
  .put(workoutController.update)
  .delete(workoutController.remove);

module.exports = router;
