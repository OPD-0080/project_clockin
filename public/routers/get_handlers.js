

const register = (req, res, next) => {
    try {
        console.log("...GETTING DATA FROM REGISTER GET ROUTE ...", req.body);
        



        // aleert user with msg
        const alert_msg = req.flash("register");
        console.log("....ALERT MESSAGE ...:", alert_msg);
        // render  data
        res.status(200).render("register")
    } catch (error) {
        console.log("...ERROR IN REGISTER ROUTER ...::", error);
    }
}
const login = (req, res, next) => {
    try {
        console.log("...GETTING DATA FROM LOGIN UI PAGE ...", req.body);

        // aleert user with msg
        const alert_msg = req.flash("login");
        console.log("....ALERT MESSAGE ...:", alert_msg);
        // render  data
        res.status(200).render("login");
    } catch (error) {
        console.log("...ERROR IN LOGIN ROUTER ...::", error);
    }
}
const logout = (req, res, next) => {
    try {
        console.log("...GETTING DATA FROM LOGOUT UI PAGE ...", req.body);


    } catch (error) {
        console.log("...ERROR IN LOGOUT ROUTER ...::", error);
    }
}

module.exports = { 
    register, login, logout
}