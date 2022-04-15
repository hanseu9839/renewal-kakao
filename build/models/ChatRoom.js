"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var roomSchema = new _mongoose["default"].Schema({
  user: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }],
  message: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Message"
  }]
});

var Room = _mongoose["default"].model("Room", roomSchema);

var _default = Room;
exports["default"] = _default;