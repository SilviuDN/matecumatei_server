module.exports = {
    checkLoggedUser: (req, res, next) => {
        console.log('************************************************')
        if (req.session.currentUser !== undefined) {
            next()
        } else {
            res.status(401).json({ code: 401, err: ['You are not authorized to access this page.'] })
        }
    },
    checkRoles: (...roles) => (req, res, next) => {
        if (roles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.status(401).json({ code: 401, err: ['You are not authorized to access this page.'] })
        }
    }
}