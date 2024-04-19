const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Message = require("../models/messages");

module.exports.message_get = asyncHandler(async (req, res, next) =>
  res.render("message_form", { user: req.user }),
);

module.exports.message_post = [
  body("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title Must Be Atleast 3 Characters!")
    .escape(),
  body("msg")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Message Must Be Atleast 3 Characters!")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      timeStamp: Date.now(),
      text: req.body.msg,
      user: req.user._id,
    });

    if (!errors.isEmpty()) {
      res.render("message_form", {
        user: req.user,
        title: message.title,
        msg: message.msg,
        errors: errors.array(),
      });
    } else {
      try {
        await message.save();
        res.redirect("/dashboard");
      } catch (err) {
        return next(err);
      }
    }
  }),
];

module.exports.delete_get = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id).exec();
  if (!message) res.redirect("/");

  res.render("message_delete_form", {
    user: req.user,
    message: message,
  });
});

module.exports.delete_post = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.body.messageid).exec();
  await Message.findByIdAndDelete(message._id);
  res.redirect("/");
});
