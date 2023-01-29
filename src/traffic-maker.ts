import { chromium } from "playwright";
import log4js from "log4js";


import { Video } from "./videos";

import { youtubeBaseLink } from "./constant";


const logger = log4js.getLogger("Traffic-Maker");

const playYuHsuanCodeVideo = async (videos : Array<Video>)=>{
    try{

        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();

        videos.map(async (video)=>{

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
                videoPlayer.volume = 0;

                // 3. Turning playing speed to 2x
                videoPlayer.playbackRate = 2;

                // 4. Close the page if video is finished
                videoPlayer.addEventListener('ended', async (event) => {

                    console.log("Video is finished !!!")

                    await page.close();
                });

                
                // 5. Check is the video stop (loop)
                // [Deprecated ?]
                // let checkPlayingLoop = setInterval(function(){
                //     if(videoPlayer.paused) videoPlayer.play()
                // },5000);


                // 6. Check that could we skip the ads. (loop)
                let checkAdsLoop = setInterval(function(){
                    let adsBtn =  document.getElementsByClassName("ytp-ad-skip-button")[0] as HTMLElement;
                    if(adsBtn){
                        adsBtn.click();
                        console.log("Skip Ads !!!");
                    }
                },5000);


            });
        });

    
        // browser.close();
    
    } catch(err){
        logger.error(err);
    }


};

export {
    playYuHsuanCodeVideo
};
