const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

/** Hash user password before saving.
 *  Ref: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
 */
UserSchema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
