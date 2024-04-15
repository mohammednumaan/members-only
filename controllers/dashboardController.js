const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler')
const moment = require('moment');
const User = require('../models/users')
const Message = require('../models/messages')

module.exports.dashboard_get = asyncHandler(async (req, res, next)  => {

    const allMessages = await Message.find().populate('user');
    if (req.isAuthenticated()) {
        const user = req.user
        res.render('dashboard', {user: user, messages: allMessages, status: req.user.status})
    }

    else res.render('login')
})
