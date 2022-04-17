"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectorMiddleware = exports.localsMiddleware = exports.homeProtectorMiddleware = exports.avatarUpload = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "doongTalk";
  res.locals.loggedInUser = req.session.user || {};
  res.locals.isHeroku = isHeroku;
  next();
};

exports.localsMiddleware = localsMiddleware;
var s3 = new _awsSdk["default"].S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
  }
});
var isHeroku = process.env.NODE_ENV === "production";
var s3ImageUploader = (0, _multerS["default"])({
  s3: s3,
  bucket: "doongtalk",
  acl: "public-read"
});

var protectorMiddleware = function protectorMiddleware(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Log in first");
    return res.redirect("/login");
  }
};

exports.protectorMiddleware = protectorMiddleware;

var homeProtectorMiddleware = function homeProtectorMiddleware(req, res, next) {
  console.log(req.session);

  if (req.session.loggedIn) {
    return res.redirect("/");
  } else {
    return next();
  }
};

exports.homeProtectorMiddleware = homeProtectorMiddleware;
var avatarUpload = (0, _multer["default"])({
  dest: "imgs/",
  limits: {
    fileSize: 3000000
  },
  storage: isHeroku ? s3ImageUploader : undefined
});
exports.avatarUpload = avatarUpload;