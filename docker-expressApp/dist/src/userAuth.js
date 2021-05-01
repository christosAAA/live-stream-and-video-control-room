"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basic_auth_1 = __importDefault(require("basic-auth"));
const utils_js_1 = require("./utils.js");
const config_1 = require("./config");
let userNameForm = '';
let userPasswordForm = '';
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = basic_auth_1.default(req);
    if (!user)
        return;
    userNameForm = user.name;
    userPasswordForm = user.pass;
    let validation = { message: '' };
    const userDetailsFromFile = yield utils_js_1.readFile(config_1.path + 'userDetails.json');
    // if user name exists returns password of specific user else returns false
    const checkUser = yield utils_js_1.userValidation(userNameForm, userDetailsFromFile);
    if (!checkUser) {
        validation = { message: 'wrong user name' };
        console.log('wrong user name');
        res.json(validation);
    }
    // from checkUser we are using the password from file
    const checkPassword = yield utils_js_1.passwordValidation(userPasswordForm, checkUser.password);
    if (checkPassword === true) {
        console.log('password true');
        next();
    }
});
exports.default = userAuth;
