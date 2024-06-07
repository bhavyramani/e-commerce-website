const passport = require('passport');
exports.isAuth = (req, res, done)=> {
    return passport.authenticate('jwt');
}

exports.sanitizeUser = (user) => {
    return {id:user.id, role:user.role};
}

exports.cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    // Just for testing
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjJmZTZiMjA0NGU5MWE1ZjZkYTE0OSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE3NzczNjI4fQ.tl9mj-yTfgkrJYo27iRsEiOmsmousyoGLs_0rOPOzXY";
    return token;
}