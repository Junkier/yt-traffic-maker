import log4js from "log4js";

import * as trafficMaker from "./traffic-maker";
import { Video } from "./videos";

log4js.configure({
    "appenders":{
        "out" : { "type" : "console"},
        "out_file" : { 
            "type": "dateFile", 
            "filename": "log/access.log",
            "pattern": ".yyyy-MM-dd",
        },
    },
    "categories":{
         "default": { "appenders": [ "out"  , "out_file"], "level": "debug" },
         "Main"  :  { "appenders": [ "out"  , "out_file"], "level": "debug" },
    }
});

const logger = log4js.getLogger("Main");


const main = async (videos : Array<Video>) => {
    try{
        await trafficMaker.playYuHsuanCodeVideo(videos);

        process.exit();
        
    } catch (err){
        logger.error(err);
    };
};


const videos: Array<Video> = [
    {
        name : "35min 簡單認識 SQL & NoSQL 資料庫",
        url  : "AbDh-ky8pbk",
    },
    {
        name : "工程師學習地圖！！！",
        url  : "5iBJgbVgCF8",
    },
    {
        name : "我如何活著 從非本科系生, 轉職成軟體工程師創業 #1",
        url  : "1UrfKfuQlgk",
    },
    {
        name : "程式學好爛！？ 台大生的 6 個學程式心法 #2",
        url  : "fZFA3AuDSF4",
    },
    {
        name : "年薪如何能破百？ 學程式的 4 個殘酷事實 #3",
        url  : "rHzzvvnQL2s",
    },
    {
        name : "VSCode 和 Node.js 環境安裝 , 外加 VSCode 主題美化",
        url  : "adAWrF2bMqg",
    },
    {
        name : "2023 Python 大入門家 (上) 到 if-else",
        url  : "I8I2yb0XOQA",
    },
    {
        name : "2023 Python 大入門家 (下) 到 function",
        url  : "X2TVjIq3wmQ",
    },
    {
        name : "遞迴只應天上有，凡人應當用迴圈",
        url  : "jot6X0pFMCk",
    },
    {
        name : "Node.js 大入門家(3/5) 非同步處理",
        url  : "7unH6k0Dyd0",
    },
    {
        name : "Node.js 大入門家(5/5) RESTful API 設計",
        url  : "5bFDUjKbSbs",
    }
];

main(videos);