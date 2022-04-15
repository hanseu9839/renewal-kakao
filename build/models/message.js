"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var messageSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    required: true,
    "default": Date.now
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  chatRoom: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Room"
  }
});

var Message = _mongoose["default"].model("Message", messageSchema);

var _default = Message;
exports["default"] = _default;