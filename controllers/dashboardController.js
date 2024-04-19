const asyncHandler = require("express-async-handler");
const Message = require("../models/messages");

module.exports.dashboard_get = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find().populate("user");
  req.isAuthenticated()
    ? res.render("dashboard", { user: req.user, messages: allMessages })
    : res.render("login");
});
