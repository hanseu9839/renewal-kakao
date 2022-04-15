"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _chatController = require("../controller/chatController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var chatRouter = _express["default"].Router();

chatRouter.route("/:user_id([0-9a-f]{24})/:friend_id([0-9a-f]{24})").get(_chatController.getChat).post(_chatController.postChat);
chatRouter.route("/rooms").get(_chatController.getChatRooms);
var _default = chatRouter;
exports["default"] = _default;