var express = require("express");
require("../db/db");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var User = require("../model/userSchema");
var auth = require("../auth/auth");
require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    var { name, email, mobile, profession, password, confirmpassword } =
      req.body;
    var userdata = new User({
      Name: name,
      Email: email,
      Mobile: mobile,
      Profession: profession,
      Password: password,
      ConfirmPassword: confirmpassword,
    });

    var token = await userdata.generateToken();
    console.log("token generate at the time of register", token);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 10000 * 60),
      httpOnly: true,
    });

    await userdata.save();
    console.log(userdata);
    res.status(200).json(userdata);
  } catch (err) {
    res
      .status(500)
      .send("Error Occured while sending the registration data to database");
  }
});

router.post("/signin", async (req, res) => {
  try {
    var { email, password } = req.body;
    var findEmail = await User.findOne({ Email: email });
    console.log("Finding Email", findEmail);

    var getLoginDetails = await bcrypt.compare(password, findEmail.Password);
    console.log("Verify Password", getLoginDetails);

    if (getLoginDetails) {
      var token = await findEmail.generateToken();
      // console.log("token generate at the time of login", token);

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 10000 * 60),
        httpOnly: true,
      });
      res.status(200).send(findEmail);
    } else {
      res.status(500).send("Please check your login details");
    }
  } catch (err) {
    res
      .status(500)
      .send("Error Occured while sending the login data to database", err);
  }
});

router.get("/home", auth, (req, res) => {
  res.send(200, req.getUser);
});
router.get("/about", auth, async (req, res) => {
  res.status(200).send(req.getUser);
});

router.post("/postnotes", auth, async (req, res) => {
  try {
    var { title, desc } = req.body;
    var Id = req.getId;
    var getuser = await User.findOne({ _id: Id });

    if (getuser) {
      var getNotesData = await getuser.postNotesData(title, desc, getuser.Date);
      await getuser.save();
      res.status(200).send(getNotesData);
      console.log("hello", getNotesData);
    } else {
      console.log("User not found in the database while fetching the request");
    }
  } catch (err) {
    res
      .status(402)
      .send("Error Occured while sedning notes data into the databasessss");
  }
});

router.get("/postnotes", auth, async (req, res) => {
  try {
    var Id = req.getId;
    var getuser = await User.findOne({ _id: Id });
    res.status(200).send(getuser);
  } catch (err) {
    res
      .status(402)
      .send("Error Occured while Getting notes data into the databasessss");
  }
});

router.get("/delete/:id", auth, async (req, res) => {
  try {
    //below two line comes from auth file
    var getNoteId = req.params.id;
    var getUser = req.getUser;

    // console.log("Nodejs Note Id", getNoteId);

    if (getUser) {
      getUser.Notes = await getUser.Notes.filter((value) => {
        return value._id != getNoteId;
      });

      await getUser.save();
      console.log("Deleteted user data", getUser);
      res.status(200).send(getUser);
    }
  } catch (err) {
    res
      .status(402)
      .send("Error Occured while Deleting notes data into the databasessss");
  }
});

router.get("/update/:id", auth, async (req, res) => {
  try {
    var getNoteId = req.params.id;
    var getUser = req.getUser;

    if (req.getUser) {
      var getupdateNote = await req.getUser.Notes.filter((value) => {
        return value._id == getNoteId;
      });

      console.log("get update user data", getupdateNote);
      res.status(200).send(getupdateNote);
    }
  } catch (err) {
    res
      .status(402)
      .send("Error Occured while Deleting notes data into the databasessss");
  }
});

router.post("/update/:id", auth, async (req, res) => {
  try {
    var { title, desc } = req.body;
    var getNoteId = req.params.id;
    var Id = req.getId;
    console.log("id is", Id);
    if (req.getUser) {
      var updated_responce = await User.updateOne(
        { _id: Id, "Notes._id": getNoteId },
        { $set: { "Notes.$.Title": title, "Notes.$.Desc": desc } }
      );
      var finduser = await User.findOne({ _id: Id });
      console.log("updated", updated_responce);
      console.log(finduser);

      res.status(200).send(finduser);
    }
  } catch (err) {
    res
      .status(402)
      .send("Error Occured while Deleting notes data into the databasessss");
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    res.clearCookie("jwt");
    req.getUser.Token = req.getUser.Token.filter((value) => {
      return value.token !== req.getCookie;
    });
    await req.getUser.save();
    res.status(200).send(req.getUser);
  } catch (err) {
    console.log("Error occured while logout form website");
  }
});

//check if email or phone already exists in database
router.post("/checkemail", async (req, res) => {
  try {
    var Email = req.body.email;

    var getuseremail = await User.findOne({ Email: Email });

    console.log("lkjsadf", getuseremail);

    if (getuseremail) {
      console.log("Not email null", getuseremail);
      res.status(200).send(getuseremail);
    } else {
      console.log(" email null", getuseremail);
      res.status(200).send("null");
    }
  } catch (err) {
    console.log("Error occured while check email or phone from database");
  }
});

router.post("/checkmobile", async (req, res) => {
  try {
    var Mobile = req.body.mobile;

    var getusermobile = await User.findOne({ Mobile: Mobile });
    console.log("kl;jsadf", getusermobile);

    if (getusermobile) {
      console.log("Not mobile null", getusermobile);
      res.status(200).send(getusermobile);
    } else {
      console.log(" email null", getusermobile);
      res.status(200).send("null");
    }
  } catch (err) {
    console.log("Error occured while check email or phone from database");
  }
});

module.exports = router;
