const express = require("express");
const {
  getChilds,
  getChild,
  createChild,
  updateChild,
  deleteChild,
} = require("../controllers/child");

const { protect } = require("../middleWare/auth");

const router = express.Router();

router.route("/").get(getChilds).post(createChild);

router.route("/:id").get(getChild).put(updateChild).delete(deleteChild);

module.exports = router;
