"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime");

require("dotenv/config");

require("./db");

require("./models/User");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _chatRouter = _interopRequireDefault(require("./Router/chatRouter"));

var _globalRouter = _interopRequireDefault(require("./Router/globalRouter"));

var _userRouter = _interopRequireDefault(require("./Router/userRouter"));

var _apiRouter = _interopRequireDefault(require("./Router/apiRouter"));

var _middleware = require("./middleware");

var _ChatRoom = _interopRequireDefault(require("./models/ChatRoom"));

var _socket = _interopRequireDefault(require("socket.io"));

var _http = _interopRequireDefault(require("http"));

var _message = _interopRequireDefault(require("./models/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");

var server = _http["default"].createServer(app);

var io = (0, _socket["default"])(server);
var PORT = process.env.PORT || 4040;
io.sockets.on('connection', function (socket) {
  //socket에서 connection을 하면 DB의 room을 찾아준다. 그 후 room에서 stateMessage들을 다 집어넣어줌 
  //populate를 써야 하는 거같음 왜냐하면 room에서는 message들의 값을 가져와야하기 떄문임
  console.log('connect');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.on('joinRoom', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
      var findRoom, i, msg;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              socket.join(data.roomID);
              socket.room = data.roomID;
              _context.next = 4;
              return _ChatRoom["default"].findById(data.roomID).populate("message");

            case 4:
              findRoom = _context.sent;
              i = 0;

            case 6:
              if (!(i < findRoom.message.length)) {
                _context.next = 14;
                break;
              }

              _context.next = 9;
              return _message["default"].findById(findRoom.message[i]._id).populate("user");

            case 9:
              msg = _context.sent;
              io.to(socket.id).emit('preload', msg);

            case 11:
              i++;
              _context.next = 6;
              break;

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  socket.on('error', function (error) {
    console.log("\uC5D0\uB7EC \uBC1C\uC0DD: ".concat(error));
  });
  socket.on('message', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
      var message, msg, room;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _message["default"].create({
                text: data.message,
                user: data.userID,
                chatRoom: data.roomID
              });

            case 2:
              message = _context2.sent;
              console.log("dbConnection");
              _context2.next = 6;
              return _message["default"].findById(message._id).populate("user");

            case 6:
              msg = _context2.sent;
              _context2.next = 9;
              return _ChatRoom["default"].findById(data.roomID);

            case 9:
              room = _context2.sent;
              room.message.push(message._id);
              room.save();
              io.to(socket.room).emit('message', msg);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
});

var handleLitening = function handleLitening() {
  return console.log("Server connect on port http://loacalhost:".concat(PORT));
};

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(_express["default"].json());
app.use(logger);
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(function (req, res, next) {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
}));
app.use((0, _expressFlash["default"])());
app.use(_middleware.localsMiddleware);
app.use("/imgs", _express["default"]["static"]("imgs"));
app.use("/static", _express["default"]["static"]("assets"));
app.use("/", _globalRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/chat", _chatRouter["default"]);
app.use("/api", _apiRouter["default"]);
server.listen(PORT, handleLitening);
var _default = app;
exports["default"] = _default;