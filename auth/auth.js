var User = require("../model/userSchema");
var jwt = require("jsonwebtoken");

var auth = async (req, res, next) => {
  try {
    var getCookie = req.cookies.jwt;
    console.log("cookie", getCookie);

    var getId = await jwt.verify(getCookie, "welcometomyfirstmernnotesproject");
    console.log("verify the user by jwt", getId);

    var getUser = await User.findOne({ _id: getId._id });
    // console.log("Get User complete details", getUser);

    req.getCookie = getCookie;
    req.getUser = getUser;
    req.getId = getId;
    console.log("id is asdfas", req.getId);

    next();
  } catch (err) {
    console.log("Please Login first...authetication error");
    res.status(500).send("Please Login First...authentication Error");
  }
};

module.exports = auth;
