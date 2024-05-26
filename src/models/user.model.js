const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userstore = new Schema(
  {
    watchHistry: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    Username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      require: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      require: [true, "image is taken by cloudnairy "],
    },
    coverImage: {
      type: String,
      require: [true, "image is taken by cloudnairy "],
    },
    password: {
      type: String,
      require: true,
    },
    reftoken: {
      type: String,
      require: true,
    },
  },

  { timestamps: true }
);

userstore.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

userstore.methods.ispasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userstore.methods.generateAccessToken = async function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userstore.methods.generateRefreshToken = async function () {
     jwt.sign({
          _id:this._id
     },
     process.env.REFERESH_ACCESS_TOKEN,
     {
      expiresIn:REFERESH_ACCESS_TOKEN_EXPIRY
     }
)
};

const user = model("user", userstore);

module.exports = {
  user,
};
