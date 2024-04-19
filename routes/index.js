const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const statusController = require("../controllers/statusController.js");
const messageController = require("../controllers/messageController.js");

const router = express.Router();

router.get("/", (req, res, next) =>
  req.isAuthenticated() ? res.redirect("/dashboard") : res.redirect("/login"),
);
router.get("/dashboard", dashboardController.dashboard_get);

router.get("/dashboard/message/:id/delete", messageController.delete_get);
router.post("/dashboard/message/:id/delete", messageController.delete_post);

router.get("/message", messageController.message_get),
  router.post("/message", messageController.message_post),
  router.get("/status/:role", statusController.status_get);
router.post("/status/:role", statusController.status_post),
  (module.exports = router);
