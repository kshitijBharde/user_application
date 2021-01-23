const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true
  },
  lastName: {
    type: String,
    maxlength: 32,
    trim: true
    },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    country: String,
    postal_code: String
  },
  userDesc: {
    type: String,
    trim: true
  }
}, {timestamps: true});

userSchema.virtual("name").
  get(function() {
    return this.firstName + ' ' + this.lastName;
   }).
  set(function(v) {
    this.firstName = v.substr(0, v.indexOf(' '));
    this.lastName = v.substr(v.indexOf(' ') + 1);
  });

module.exports = mongoose.model("User", userSchema);
