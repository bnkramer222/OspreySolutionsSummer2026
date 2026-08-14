const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const opportunityController = require("../controllers/opportunityController");

router.get("/",  opportunityController.list);
router.get("/new", requireAuth, opportunityController.showAddForm);
router.post("/new", requireAuth, opportunityController.add);
router.get("/:id/edit", requireAuth, opportunityController.showEditForm);
router.post("/:id/edit", requireAuth, opportunityController.edit);
router.post("/:id/delete", requireAuth, opportunityController.delete);
router.get("/:id/matches", requireAuth, opportunityController.matches);
router.get("/:id/data", requireAuth, opportunityController.getData);
router.post("/:id/matches/add", requireAuth, opportunityController.addMatch);
router.post("/:id/matches/remove", requireAuth, opportunityController.removeMatch);
router.get("/volunteers/all", requireAuth, opportunityController.getAllVolunteers);
router.get("/centers", requireAuth, opportunityController.getCenters);

module.exports = router;