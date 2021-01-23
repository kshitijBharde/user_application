const User = require("../models/user");
const { validationResult } = require("express-validator");
const escapeRegex = require('../utilities/regex');
const _ = require("lodash");

exports.fetchUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }

        req.profile = user;
        next();
    });
};

exports.createUser = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
        param: errors.array()[0].param,
      });
    }

    const user = new User(req.body);
    user.save((err, savedUser) => {
      if (err) {
        return res.status(400).json({
          err: "Not able to save user in DB.",
        });
      }

      savedUser.createdAt = undefined;
      savedUser.updatedAt = undefined;
      savedUser.__v = undefined;
      res.json(savedUser);
    });
};

exports.getUsers = async (req, res) => {
    // Declaring variable
    const resPerPage = 10; // results per page
    const page = req.params.page || 1; // Page
    try {
     if (req.query.search) {
    // Declaring query based/search variables
       const searchQuery = req.query.search,
       regex = new RegExp(escapeRegex(req.query.search), 'gi');
    // Find Demanded Users - Skipping page values, limit results per page
    const foundUsers = await User.find({$or:[{firstName: regex},{lastName:regex}, {email: regex}]})
          .skip((resPerPage * page) - resPerPage)
          .limit(resPerPage);
    foundUsers.map(user => {
      user.createdAt = undefined;
      user.updatedAt = undefined;
      user.__v = undefined;
    });
    // Count how many users were found
    const numOfUsers = await User.count({$or:[{firstName: regex},{lastName:regex}, {email: regex}]});
    // Send the rsponse
    res.render('userRecords', foundUsers);
    res.json(
        {
            "users": foundUsers, 
            "currentPage": page,
            "pages": Math.ceil(numOfUsers / resPerPage),
            "searchVal": searchQuery,
            "numOfResults": numOfUsers
        }
    );
     } else {
        const foundUsers = await User.find()
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);

        foundUsers.map(user => {
          user.createdAt = undefined;
          user.updatedAt = undefined;
          user.__v = undefined;
        });

        const numOfUsers = await User.count();

        res.json(
            {
                "users": foundUsers,
                "currentPage": page,
                "pages": Math.ceil(numOfUsers / resPerPage),
                "searchVal": "",
                "numOfResults": numOfUsers
            }
        );
     }
    } catch (err) {
      throw new Error(err);
    }
};

exports.getAUser = (req, res) => {
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.__v = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    let user = req.user;

    User.findOneAndUpdate(user,
        req.body, {new: true},
        (err, updatedUser) => {
            if (err) {
                return res.status(400).json({
                  err: "Not able to updated the user.",
                });
              }
            updatedUser.createdAt = undefined;
            updatedUser.updatedAt = undefined;
            updatedUser.__v = undefined;
            return res.json(updatedUser);
        });
};

exports.removeUser = (req, res) => {
    User.findOneAndRemove({_id: req.params.userId}, (err, deletedUser) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the user.",
        });
      }
      deletedUser.createdAt = undefined;
      deletedUser.updatedAt = undefined;
      deletedUser.__v = undefined;
      return res.json({
        message: "Deleted user successfully.",
        deletedUser,
      });
    });
};