module.exports.dashboard_get = (req, res, next) => {
    if (req.isAuthenticated()) res.render('dashboard', {user: req.user.username})
    else res.render('login')
}