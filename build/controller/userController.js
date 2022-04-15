"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSearch = exports.postLogin = exports.postJoin = exports.postEdit = exports.postChangePassword = exports.plusFriend = exports.logout = exports.handleHome = exports.getSearch = exports.getLogin = exports.getJoin = exports.getEdit = exports.getChangePassword = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var handleHome = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _id, user, friends;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _id = req.session.user;
            _context.next = 3;
            return _User["default"].findOne({
              _id: _id
            }).populate("friend");

          case 3:
            user = _context.sent;
            friends = user.friend;
            return _context.abrupt("return", res.render("home", {
              siteName: "DoongTalk",
              pageTitle: "Friend",
              friends: friends
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleHome(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.handleHome = handleHome;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Login",
    siteName: "DoongTalk"
  });
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, username, password, user, ok;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context2.next = 3;
            return _User["default"].findOne({
              username: username
            });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).render("login", {
              pageTitle: "Login",
              errorMessage: "이 사용자 이름을 가진 계정이 없습니다."
            }));

          case 6:
            _context2.next = 8;
            return _bcrypt["default"].compare(password, user.password);

          case 8:
            ok = _context2.sent;

            if (ok) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(400).render("login", {
              pageTitle: "Login",
              siteName: "DoongTalk",
              ErrorMessage: "잘못된 패스워드입니다."
            }));

          case 11:
            req.session.loggedIn = true;
            req.session.user = user;
            return _context2.abrupt("return", res.redirect("/"));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageTitle: "Join",
    siteName: "DoongTalk"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body2, name, username, email, password, password2, pageTitle, exists;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, username = _req$body2.username, email = _req$body2.email, password = _req$body2.password, password2 = _req$body2.password2;
            pageTitle = "Join";

            if (!(password !== password2)) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "비밀번호 확인이 일치하지 않습니다"
            }));

          case 4:
            _context3.next = 6;
            return _User["default"].exists({
              $or: [{
                username: username
              }, {
                email: email
              }]
            });

          case 6:
            exists = _context3.sent;

            if (!exists) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "이 사용자 이름/이메일은 이미 사용되고 있습니다."
            }));

          case 9:
            _context3.prev = 9;
            _context3.next = 12;
            return _User["default"].create({
              name: name,
              username: username,
              email: email,
              password: password
            });

          case 12:
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](9);
            return _context3.abrupt("return", res.status(400).render("join", {
              pageTitle: "Join",
              errorMessage: _context3.t0._message
            }));

          case 17:
            return _context3.abrupt("return", res.redirect("/"));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[9, 14]]);
  }));

  return function postJoin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getEdit = function getEdit(req, res) {
  res.render("edit", {
    pageTitle: "profile-edit"
  });
};

exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$session$user, _id, avatarUrl, sessionEmail, sessionName, _req$body3, name, email, stateMessage, file, foundUser, updatedUser;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$session$user = req.session.user, _id = _req$session$user._id, avatarUrl = _req$session$user.avatarUrl, sessionEmail = _req$session$user.email, sessionName = _req$session$user.name, _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, stateMessage = _req$body3.stateMessage, file = req.file;

            if (!(sessionEmail !== email)) {
              _context4.next = 7;
              break;
            }

            _context4.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            foundUser = _context4.sent;

            if (!(foundUser && foundUser._id !== _id)) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(400).render("edit", {
              pageTitle: "Profile-edit",
              errorMessage: "이미 있는 이메일입니다."
            }));

          case 7:
            _context4.next = 9;
            return _User["default"].findByIdAndUpdate(_id, {
              name: name,
              email: email,
              stateMessage: stateMessage,
              avatarUrl: file ? file.path : avatarUrl
            }, {
              "new": true
            });

          case 9:
            updatedUser = _context4.sent;
            req.session.user = updatedUser;
            console.log(updatedUser);
            return _context4.abrupt("return", res.redirect("/users/edit"));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;

var getSearch = function getSearch(req, res) {
  return res.render("search", {
    pageTitle: "Search"
  });
};

exports.getSearch = getSearch;

var postSearch = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var user, useremail, foundUser;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            user = req.session.user;
            useremail = req.body.useremail;
            _context5.next = 4;
            return _User["default"].findOne({
              email: useremail
            });

          case 4:
            foundUser = _context5.sent;
            console.log(user._id);
            console.log(foundUser._id);

            if (!(user._id == foundUser._id)) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.render("search", {
              errorMessage: "본인은 친구가 될 수 없습니다."
            }));

          case 9:
            if (foundUser) {
              _context5.next = 11;
              break;
            }

            return _context5.abrupt("return", res.render("search", {
              errorMessage: "이메일을 찾을수 없습니다."
            }));

          case 11:
            return _context5.abrupt("return", res.render("search", {
              foundUser: foundUser
            }));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function postSearch(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postSearch = postSearch;

var plusFriend = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var friendUserName, user, flag, friendUser, friend, currentUser, num;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            friendUserName = req.body, user = req.session.user;
            console.log(friendUserName);
            _context6.next = 4;
            return _User["default"].findOne({
              username: friendUserName.friendUserName
            });

          case 4:
            friendUser = _context6.sent;
            friend = friendUser._id;
            _context6.next = 8;
            return _User["default"].findById(user._id);

          case 8:
            currentUser = _context6.sent;
            console.log(friendUser);
            num = 0;

          case 11:
            if (!(num < currentUser.friend.length)) {
              _context6.next = 18;
              break;
            }

            flag = currentUser.friend[num]._id.toString() === friendUser._id.toString();

            if (!flag) {
              _context6.next = 15;
              break;
            }

            return _context6.abrupt("return", res.sendStatus(404));

          case 15:
            num++;
            _context6.next = 11;
            break;

          case 18:
            currentUser.friend.push(friend);
            currentUser.save();
            req.session.user = currentUser;
            return _context6.abrupt("return", res.sendStatus(201));

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function plusFriend(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.plusFriend = plusFriend;

var logout = function logout(req, res) {
  req.session.destroy();
  return res.redirect("/login");
};

exports.logout = logout;

var getChangePassword = function getChangePassword(req, res) {
  return res.render("users/change-password", {
    pageTitle: "Change Password"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body4, oldPassword, newPassword, newPasswordConfirmation, _id, user, ok;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body4 = req.body, oldPassword = _req$body4.oldPassword, newPassword = _req$body4.newPassword, newPasswordConfirmation = _req$body4.newPasswordConfirmation, _id = req.session.user._id;
            _context7.next = 3;
            return _User["default"].findById(_id);

          case 3:
            user = _context7.sent;
            _context7.next = 6;
            return _bcrypt["default"].compare(oldPassword, user.password);

          case 6:
            ok = _context7.sent;

            if (!(oldPassword === newPassword)) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", res.status(400).render("users/change-password", {
              pageTitle: "change-password",
              errorMessage: "바꾸려는 비밀번호가 현재 비밀번호와 같습니다."
            }));

          case 9:
            if (ok) {
              _context7.next = 11;
              break;
            }

            return _context7.abrupt("return", res.status(400).render("users/change-password", {
              pageTitle: "change-password",
              errorMessage: "현재 비밀번호가 틀렸습니다."
            }));

          case 11:
            if (!(newPassword !== newPasswordConfirmation)) {
              _context7.next = 13;
              break;
            }

            return _context7.abrupt("return", res.status(400).render("users/change-password", {
              pageTitle: "Change password",
              errorMessage: "패스워드 두개가 일치하지 않습니다."
            }));

          case 13:
            user.password = newPassword;
            _context7.next = 16;
            return user.save();

          case 16:
            return _context7.abrupt("return", res.redirect("/"));

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function postChangePassword(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;