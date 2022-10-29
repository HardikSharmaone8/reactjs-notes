var mongoose = require("mongoose");
var validator = require("validator");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
require("dotenv").config();

var userObj = new mongoose.Schema({
  Name: {
    type: String,
    uppercase: true,
    minlength: 2,
  },
  Email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please check Your Email Address");
      }
    },
    lowercase: true,
    unique: true,
  },
  Mobile: {
    type: Number,
    minlength: 6,
    unique: true,
  },
  Profession: {
    type: String,
    uppercase: true,
  },
  Password: {
    type: String,
    minlength: 6,
  },
  ConfirmPassword: {
    type: String,
    minlength: 6,
  },
  Notes: [
    {
      Title: {
        type: String,
        required: true,
        uppercase: true,
      },
      Desc: {
        type: String,
        required: true,
      },
      Date: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  Date: {
    type: Date,
    default: new Date(),
  },
  Token: [
    {
      token: {
        type: String,
      },
    },
  ],
});

userObj.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 10);
  }
  if (this.isModified("ConfirmPassword")) {
    this.ConfirmPassword = await bcrypt.hash(this.ConfirmPassword, 10);
  }
  next();
});

userObj.methods.generateToken = async function () {
  var tokenGenerate = await jwt.sign(
    { _id: this._id.toString() },
    process.env.secreat_key
  );
  this.Token = this.Token.concat({ token: tokenGenerate });
  await this.save();
  return tokenGenerate;
};

userObj.methods.postNotesData = async function (title, desc) {
  this.Notes = this.Notes.concat({ Title: title, Desc: desc });
  await this.save();
  return this.Notes;
};
var User = new mongoose.model("userdata", userObj);

module.exports = User;
