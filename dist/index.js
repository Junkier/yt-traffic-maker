"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    "appenders": {
        "out": { "type": "console" }
    },
    "categories": {
        "default": { "appenders": ["out", "out_file"], "level": "debug" },
        "Main": { "appenders": ["out", "out_file"], "level": "debug" },
    }
});
const logger = log4js_1.default.getLogger("Main");
const main = async () => {
    try {
        logger.info("GOGOGO !!!");
    }
    catch (err) {
        logger.error(err);
    }
    ;
};
main();
