"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const trafficMaker = __importStar(require("./traffic-maker"));
log4js_1.default.configure({
    "appenders": {
        "out": { "type": "console" },
        "out_file": {
            "type": "dateFile",
            "filename": "log/access.log",
            "pattern": ".yyyy-MM-dd",
        },
    },
    "categories": {
        "default": { "appenders": ["out", "out_file"], "level": "debug" },
        "Main": { "appenders": ["out", "out_file"], "level": "debug" },
    }
});
const logger = log4js_1.default.getLogger("Main");
const main = async (videos) => {
    try {
        trafficMaker.playYuHsuanCodeVideo(videos);
    }
    catch (err) {
        logger.error(err);
    }
    ;
};
const videos = [
    {
        name: "35min 簡單認識 SQL & NoSQL 資料庫",
        url: "AbDh-ky8pbk",
    },
    {
        name: "工程師學習地圖！！！",
        url: "5iBJgbVgCF8",
    }
];
main(videos);
