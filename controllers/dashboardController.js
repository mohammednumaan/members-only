module.exports.dashboard_get = (req, res, next) => {
    if (req.isAuthenticated()) {
        const user = req.user
        res.render('dashboard', {user: user})
    }

    else res.render('login')
}

