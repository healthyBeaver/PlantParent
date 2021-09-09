const router = require("express").Router();
let user = require("../models/user.model");

//handles incoming get requests to localhost/menuItems/
router.route("/createAccount").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const preferred_name = req.body.preferred_name;
  const email = req.body.email;
  const newUser = new user({ username, password, preferred_name, email });

  newUser
    .save()
    .then(() => {
      res.json("New user created!");
    })
    .catch((err) => {
      if (err.name == "MongoError") res.status(400).json("Duplicate");
      else if (err.name == "ValidationError") res.status(400).json("Too short");
      else res.status(400).json("Error" + err);
    });
});

router.route("/login").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  user
    .findOne({ username: username, password: password })
    .then((user) => {
      if (user) {
        res.status(200).json({
          userID: user._id,
          name: user.preferred_name,
          email: user.email,
        });
      } else {
        res.status(400).json("Not Found");
      }
    })
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/getNameEmail").get((req, res) => {
  const id = req.body.userID;
  user
    .find({ _id: id }, { preferred_name: 1, _id: 0, email: 0, password: 0 })
    .then((userInfo) => {
      if (userInfo) {
        res.status(200).json({
          name: userInfo.preferred_name,
        });
      } else res.status(400).json("No information found!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
//deletes account
router.route("/delete").delete((req, res) => {
  const userID = req.body.userID;
  user
    .findOneAndRemove({ _id: userID })
    .then(() => res.status(200).json("Deleted!"))
    .catch((err) => console.log("Error: " + err));
});

//update username
router.route("/updateUsername").post((req, res) => {
  const userID = req.body.userID;
  const newName = req.body.username;
  user
    .findOneAndUpdate({ _id: userID }, { username: newName })
    .then(() => res.status(200).json("Username is Updated!"))
    .catch((err) => console.log("Error: " + err));
});

//update password
router.route("/updatePassword").post((req, res) => {
  const userID = req.body.userID;
  const newPassword = req.body.password;
  user
    .findOneAndUpdate({ _id: userID }, { password: newPassword })
    .then(() =>
      res.status(200).json("Password is Updated! Redirect to login screen")
    )
    .catch((err) => console.log("Error: " + err));
});

module.exports = router; //do this for all routers
