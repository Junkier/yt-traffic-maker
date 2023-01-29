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
        trafficMaker.playYuHsuanCodeVideo(videos);
        
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
    }
];

main(videos);