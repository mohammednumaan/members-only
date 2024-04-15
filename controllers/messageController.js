const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler')
const User = require('../models/users')
const Message = require('../models/messages')



module.exports.message_get = asyncHandler(async (req, res, next) => res.render('message_form'));

module.exports.message_post = [

    body('title').trim().isLength({min: 3}).withMessage('Title Must Be Atleast 3 Characters!').escape(),
    body('msg').trim().isLength({min: 3}).withMessage('Message Must Be Atleast 3 Characters!').escape(),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);
        const user = req.user;

        const message = new Message({
            title: req.body.title,
            timeStamp: Date.now(),
            text: req.body.msg,
            user: req.user._id
        })
        
        if(!errors.isEmpty()){
            res.render('message_form', {
                title: message.title,
                msg: message.msg,
                errors: errors.array()
            })
        } else{
            try{
                await message.save()
                res.redirect('/dashboard');
            } catch(err){
                return next(err);
            }
        }
    })

]
