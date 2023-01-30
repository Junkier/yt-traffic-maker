import { chromium } from "playwright";
import log4js from "log4js";

import { Video } from "./videos";
import { youtubeBaseLink } from "./constant";

const logger = log4js.getLogger("Traffic-Maker");

const sleep = (ms: number) => new Promise( r => setTimeout(r , ms));

const playYuHsuanCodeVideo = async (videos : Array<Video>)=>{
    try{

        const browser = await chromium.launch({
            // headless: false
        });
        const context = await browser.newContext();

        let missions = videos.map(async (video,i)=>{
            try{

                // It may cause something stuck if everyone is running at the same time.
                await sleep(15* 1000 * Math.floor(i/ 3));

                const link = `${youtubeBaseLink}/${video.url}`;
            
                logger.info(`Start to play ${video.name}`);

                const page = await context.newPage();
            
                await page.goto(link,{"waitUntil" : "networkidle"});

                await page.evaluate(async ()=>{

                    // 0. Get the video instance
                    let videoPlayer = document.getElementsByTagName("video")[0];

                    // 1. Click play button
                    await videoPlayer.play();

                    // 2. Cancel voice
                    // 3. Turning playing speed to 2x
                    setInterval(function(){
                        if(videoPlayer.playbackRate !== 2) videoPlayer.playbackRate = 2;
                        if(videoPlayer.volume !== 0) videoPlayer.volume = 0;
                    },2500)

                    // 4. Check that could we skip the ads. (loop)
                    let checkAdsLoop = setInterval(function(){
                        let adsBtn =  document.getElementsByClassName("ytp-ad-skip-button")[0] as HTMLElement;
                        if(adsBtn){
                            adsBtn.click();
                            console.log("Skip Ads !!!");
                        }
                    },2500);
                });


                // [Issue]
                // a. docker in Linux 會在 20min 後自動 exit !?
                // b. 無法顯示成功！？
                // 5. close the page if video is finished
                await page.waitForFunction(() =>{
                    console.log("waitForFunction");
                    return document.getElementsByTagName("video")[0].paused;
                }, null , {
                    polling : 3 * 1000,
                    timeout : 12 * 60 * 60 * 1000 // 12hr
                });

                await page.close();

                logger.info(`${video.name} is done.`);

                return "done.";

            } catch(err){
                return err;
            };
        });

        await Promise.all(missions);

        logger.info("All video is done.");
    
    } catch(err){
        logger.error(err);
    };

};

export {
    playYuHsuanCodeVideo
};
