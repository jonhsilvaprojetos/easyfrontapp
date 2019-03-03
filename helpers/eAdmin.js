module.exports = {
    eAdmin: function (req, res, next) {
        
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next()
        }

        req.flash("error_msg", "você deve está logado e ser administrador")
        res.redirect("/user/login")
    }
}