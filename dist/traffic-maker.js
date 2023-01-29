"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playYuHsuanCodeVideo = void 0;
const log4js_1 = __importDefault(require("log4js"));
const logger = log4js_1.default.getLogger("Traffic-Maker");
const playYuHsuanCodeVideo = async (url) => {
    logger.debug("GOGOGO !!!");
};
exports.playYuHsuanCodeVideo = playYuHsuanCodeVideo;
// const createAgreementPDF = async (appCaseNo: String)=>{
//     try{
//         const browser = await chromium.launch({
//             // headless: false
//         });
//         logger.info(`Start to generate ${appCaseNo} file.`);
//         const page = await browser.newPage();
//         const baseLink = "https://storage.googleapis.com/jetshop-store-cdn/views/agreement.html";
//         const accessToken = process.env.ACCESS_TOKEN;
//         const link = `${baseLink}?appCaseNo=${appCaseNo}&from=inquire&action=advanced&access_token=${accessToken}`;
//         await page.goto(link,{"waitUntil" : "networkidle"});
//         await page.waitForSelector(`table#paymentBook`, {
//             state : "visible"
//         })
//         await page.pdf({ path : `./bundles/${appCaseNo}.pdf`});
//         browser.close();
//         logger.info(`Generating ${appCaseNo} file is done.`);
//     }catch(err){
//         logger.error(`* ${appCaseNo} get Error`);
//         logger.error(err);
//     };
// };
