const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { createUser, getUsers, fetchUserById, getAUser, updateUser, removeUser} = require("../controllers/user");

router.param("userId", fetchUserById);

//Created Route
router.post("/people", [
    check("firstName")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long")
      .isAlpha()
      .withMessage("should only constains alphabets a-z A-Z"),
    check("email").isEmail().withMessage("a valid email is required"),
    check("dob").isISO8601("yyyy-mm-dd").withMessage("dob submitted is not valid")
  ], createUser);

//Get one By Id Route
router.get("/people/:userId", getAUser);

//Get/Search Route
router.get("/people/:page?", getUsers);

//Update Route
router.put("/people/:userId", updateUser);

//Delete Route
router.delete("/remove/:userId", removeUser);

module.exports = router;
