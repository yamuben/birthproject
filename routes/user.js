const express = require("express");
const {
  register,
  login,
  updateDetails,
  updatePassword,
  deleteUser,getAllUsers
} = require("../controllers/user");

const { protect } = require("../middleWare/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", getAllUsers);
router.put("/updateDetails/:id", updateDetails);
router.put("/updatePassword/:id", updatePassword);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
