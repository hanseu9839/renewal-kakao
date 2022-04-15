"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controller/userController");

var _middleware = require("../middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.route("/edit").all(_middleware.protectorMiddleware).get(_userController.getEdit).post(_middleware.avatarUpload.single("avatar"), _userController.postEdit);
userRouter.route("/change-password").all(_middleware.protectorMiddleware).get(_userController.getChangePassword).post(_userController.postChangePassword);
var _default = userRouter;
exports["default"] = _default;