const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleWare/async");
const Child = require("../models/child");

// @desc         get all childs
// @route        GET /api/v1/child
// @access       public

exports.getChilds = asyncHandler(async (req, res, next) => {
  const child = await Child.find();
  res.status(200).json({ success: true, count: child.length, data: child });
});

// @desc         get single child
// @route        GET /api/v1/child/:id
// @access       public

exports.getChild = asyncHandler(async (req, res, next) => {
  const child = await Child.findById(req.params.id);

  if (!child) {
    return next(
      new errorResponse(`child not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: child });
});

// @desc         create new child
// @route        POST /api/v1/child
// @access       privet

exports.createChild = asyncHandler(async (req, res, next) => {
  const child = await Child.create(req.body);

  res.status(201).json({
    success: true,
    data: child,
  });
});

// @desc      Update child
// @route     PUT /api/v1/child/:id
// @access    Private
exports.updateChild = asyncHandler(async (req, res, next) => {
  let child = await Child.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!child) {
    return next(
      new errorResponse(`child not found with id of ${req.params.id}`, 404)
    );
  }

  return res.status(200).json({ success: true, data: child });
});

// @desc      Delete child
// @route     DELETE /api/v1/child/:id
// @access    Private
exports.deleteChild = asyncHandler(async (req, res, next) => {
  const child = await Child.findById(req.params.id);

  if (!child) {
    return next(
      new errorResponse(`child not found with id of ${req.params.id}`, 404)
    );
  }

  child.remove();

  res.status(200).json({ success: true, data: {} });
});
