"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postChat = exports.getChatRooms = exports.getChat = void 0;

var _ChatRoom = _interopRequireDefault(require("../models/ChatRoom"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getChat = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$params, user_id, friend_id, foundRoom, room;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$params = req.params, user_id = _req$params.user_id, friend_id = _req$params.friend_id;
            _context.next = 3;
            return _ChatRoom["default"].exists({
              $and: [{
                user: user_id
              }, {
                user: friend_id
              }]
            });

          case 3:
            foundRoom = _context.sent;

            if (!foundRoom) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.render('chat', {
              pageTitle: "ChattingRoom",
              foundRoom: foundRoom
            }));

          case 6:
            _context.next = 8;
            return _ChatRoom["default"].create({
              user: user_id
            });

          case 8:
            room = _context.sent;
            room.user.push(friend_id);
            room.save();
            return _context.abrupt("return", res.status(200).render("chat", {
              pageTitle: "Chatting Room",
              room: room
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getChat(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getChat = getChat;

var postChat = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$params2, user_id, friend_id, foundRoom;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$params2 = req.params, user_id = _req$params2.user_id, friend_id = _req$params2.friend_id;
            _context2.next = 3;
            return _ChatRoom["default"].exists({
              $and: [{
                user: user_id
              }, {
                user: friend_id
              }]
            });

          case 3:
            foundRoom = _context2.sent;

            if (foundRoom) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.render('/', {
              pageTitle: "Friend"
            }));

          case 6:
            return _context2.abrupt("return", res.status(200).render("chat", {
              pageTitle: "Chatting Room",
              foundRoom: foundRoom
            }));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postChat(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postChat = postChat;

var getChatRooms = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _id, rooms;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = req.session.user;
            _context3.next = 3;
            return _ChatRoom["default"].find({
              user: _id
            }).populate("user").populate("message");

          case 3:
            rooms = _context3.sent;
            console.log(rooms[1]);
            return _context3.abrupt("return", res.render("rooms", {
              pageTitle: "Chatting Friends Room",
              rooms: rooms
            }));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getChatRooms(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getChatRooms = getChatRooms;