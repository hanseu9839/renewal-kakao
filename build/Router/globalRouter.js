"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controller/userController");

var _middleware = require("../middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.route("/").all(_middleware.protectorMiddleware).get(_userController.handleHome);
globalRouter.route("/login").all(_middleware.homeProtectorMiddleware).get(_userController.getLogin).post(_userController.postLogin);
globalRouter.route("/join").get(_userController.getJoin).post(_userController.postJoin);
globalRouter.route("/search").all(_middleware.protectorMiddleware).get(_userController.getSearch).post(_userController.postSearch);
globalRouter.route("/logout").get(_userController.logout);
var _default = globalRouter;
exports["default"] = _default;